module.exports = class unregisterFromStreamUseCase {
  constructor(
    {
      apiPresenter,
      clientCommunicationManager
    },
    { connectionId }
  ) {
    this.apiPresenter = apiPresenter
    this.connectionId = connectionId
    this.clientCommunicationManager = clientCommunicationManager
  }

  async execute() {
    try {
      await this.clientCommunicationManager.unregisterFromStream({
        connectionId: this.connectionId,
      })
      return this.apiPresenter.render()
    } catch (err) {
      return this.apiPresenter.render({ err })
    }
  }
}
