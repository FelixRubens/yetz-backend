module.exports = class ListPlayersUseCase {
  constructor(
    {
      apiPresenter,
      playerRepository,
    }
  ) {
    this.apiPresenter = apiPresenter
    this.playerRepository = playerRepository
  }

  async execute() {
    try {
      const result = await this._listPlayers()
      return this.apiPresenter.render({ result })
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }

  async _listPlayers() {
    return await this.playerRepository.list()
  }
}
