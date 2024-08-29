class ClientCommunicationManager {
  constructor ({
    clientWebsocketManager,
    connectionRepository
  }) {
    this.websocketManager = clientWebsocketManager
    this.connectionRepository = connectionRepository
  }

  sendConnectionId (connectionId) {
    const content = {
      type: 'connectionId',
      data: { connectionId }
    }
    return this.websocketManager.sendMessage({ connectionId, content })
  }

  async streamClientData ({ data }) {
    let connections = await this.connectionRepository.list()
    console.log(connections)
    if (connections.length === 0) return Promise.resolve()

    for (const connection of connections) {
      const { connectionId } = connection
      
      const content = {
        type: 'clientDataStream',
        data: { data }
      }
      try {
        await this.websocketManager.sendMessage({ connectionId, content })
      } catch (err) {
        await this.connectionRepository.remove(connectionId)
      }
    }
  }

  registerForStream ({ connectionId }) {
    return this.connectionRepository.create(connectionId)
  }

  unregisterFromStream ({ connectionId }) {
    return this.connectionRepository.remove(connectionId)
  }
}

module.exports = ClientCommunicationManager
