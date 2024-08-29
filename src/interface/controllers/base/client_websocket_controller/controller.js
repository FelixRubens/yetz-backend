module.exports = class ClientWebsocketController {
  constructor ({
    clientCommunicationManager
  }) {
    this.clientCommunicationManager = clientCommunicationManager
  }

  createConnectHandler () {
    return (event) => {
      console.log('createConnectHandler', event.requestContext.connectionId)
      return Promise.resolve({ statusCode: 200 })
    }
  }

  createDisconnectHandler (useCase) {
    return async (event) => {
      console.log('createDisconnectHandler', event.requestContext.connectionId)
      try {
        await useCase({
          connectionId: event.requestContext.connectionId,
          clientCommunicationManager: this.clientCommunicationManager
        })
      } catch (err) {
        console.log(err)
      }

      return Promise.resolve({ statusCode: 200 })
    }
  }

  createDefaultHandler () {
    return (event) => {
      const { requestContext: { routeKey } } = event
      console.log('Not supported routeKey:', routeKey)
      return Promise.resolve({ statusCode: 200 })
    }
  }

  createConnectionIdHandler (useCase) {
    return async (event) => {
      console.log('createConnectionIdHandler', event.requestContext.connectionId)
      try {
        await useCase({
          connectionId: event.requestContext.connectionId,
          clientCommunicationManager: this.clientCommunicationManager
        })
      } catch (err) {
        console.log(err)
      }
      return Promise.resolve({ statusCode: 200 })
    }
  }

  createKeepAliveHandler () {
    return () => {
      return Promise.resolve({ statusCode: 200 })
    }
  }
}
