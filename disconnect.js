const { createContainer } = require('./container/container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const DisconnectClientUseCase = require('use_cases/websocket/clientDisconnect')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.clientWebsocketController.createDisconnectHandler(DisconnectClientUseCase)
  }
})
