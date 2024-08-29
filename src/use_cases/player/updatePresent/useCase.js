module.exports = class UpdatePresentUseCase {
  constructor(
    {
      apiPresenter,
      playerRepository,
    }, {
      playerId, value
    }
  ) {
    this.apiPresenter = apiPresenter
    this.playerRepository = playerRepository
    this.playerId = playerId
    this.value = value
  }

  async execute() {
    try {
      const result = await this._updatePresent()
      return this.apiPresenter.render({ result })
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }

  async _updatePresent() {
    return await this.playerRepository.updatePresent(this.playerId, this.value ? 1 : 0)
  }
}
