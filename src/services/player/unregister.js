const { createContainer } = require('./container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const UnregisterForStreamUseCase = require('use_cases/player/unregister')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.baseController.createHandler(UnregisterForStreamUseCase)
  }
})
