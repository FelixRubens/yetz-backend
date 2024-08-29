module.exports = class StreamDataUseCase {
  constructor(
    {
      apiPresenter,
      clientCommunicationManager,
    },
    data
  ) {
    this.apiPresenter = apiPresenter
    this.clientCommunicationManager = clientCommunicationManager
    this.data = data
  }

  async execute() {
    try {
      await this._streamToClient(this.data)
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }

  async _streamToClient(data) {
    await this.clientCommunicationManager.streamClientData({ data })
  }
}
