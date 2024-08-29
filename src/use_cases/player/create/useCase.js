module.exports = class CreatePlayerUseCase {
  constructor(
    {
      apiPresenter,
      playerRepository,
    }, 
    { players }
  ) {
    this.apiPresenter = apiPresenter
    this.playerRepository = playerRepository
    this.players = players
  }

  async execute() {
    try {
      const result = await this._createPlayer()
      return this.apiPresenter.render({ result })
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }

  async _createPlayer() {
    for (const player of this.players) await this.playerRepository.create(player)
  }
}
