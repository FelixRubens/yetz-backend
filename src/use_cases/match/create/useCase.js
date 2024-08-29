module.exports = class CreateMatchUseCase {
  constructor(
    {
      apiPresenter,
      playerRepository,
      sqsManager
    }, {
      totalPlayers
    }
  ) {
    this.apiPresenter = apiPresenter
    this.playerRepository = playerRepository
    this.totalPlayers = totalPlayers
    this.sqsManager = sqsManager
  }

  async execute() {
    try {
      const players = await this._listPlayers()
      let presentPlayers = this._shufflePlayers(players.filter(player => player.isPresent === 1))
      const goalkeepers = []

      for (const player of presentPlayers) {
        if (player.isGoalkeeper) goalkeepers.push(player) //escolhe ao menos 2 goleiros para ter certeza de ter pelo menos 2 no jogo
        if (goalkeepers.length === 2) break
      }

      presentPlayers = presentPlayers.filter(player => !goalkeepers.some(e => e.id === player.id))// retira os goleiros escolhidos da lista de presentes
      let result

      if ((presentPlayers.length + goalkeepers.length) < this.totalPlayers*2) result = { error: `Numero insuficiente de jogadores para times de ${this.totalPlayers}.`}
      else {
        presentPlayers = presentPlayers.slice(0, (this.totalPlayers*2) - goalkeepers.length) //limita o numero de jogadores sorteados a NumeroTotalNoJogo - GoleirosJaEscolhidos
        result = this._generateMatch(presentPlayers, goalkeepers)
        try {
          await this.sqsManager.sendMessage(result)
          console.log('sending message to queue', result)
        } catch (err) {
          console.log(err)
        }
      }

      return this.apiPresenter.render({ result })
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }

  _shufflePlayers(players) {
    const shuffledPlayers = [...players]

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // o ; só existe aqui pois sem ele o interpretador JS quebra
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]]
    }

    return shuffledPlayers
  }

  _generateMatch(players, goalkeepers) {
    let sortedPlayersBySkill = players.slice().sort((playerOne, playerTwo) => playerTwo.skillLevel - playerOne.skillLevel) // ordena os jogadores por skill
    sortedPlayersBySkill = [...goalkeepers, ...sortedPlayersBySkill] // insere os goleiros no inicio da lista
    const teamOne = []
    const teamTwo = []
    let teamOneSkill = 0
    let teamTwoSkill = 0

    sortedPlayersBySkill.forEach((player, index) => {
      if (index % 2 === 0) {
        teamOne.push(player)
        teamOneSkill += player.skillLevel
      } else {
        teamTwo.push(player)
        teamTwoSkill += player.skillLevel
      }
    })

    return {
      teamOne,
      teamTwo,
      teamOneSkill,
      teamTwoSkill
    }
  }

  async _listPlayers() {
    return await this.playerRepository.list()
  }
}
