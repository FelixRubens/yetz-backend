const { createContainer } = require('./container/container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const SendConnectionIdUseCase = require('use_cases/websocket/sendConnectionId')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.clientWebsocketController.createConnectionIdHandler(SendConnectionIdUseCase)
  }
})
