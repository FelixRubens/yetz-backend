const { createContainer } = require('./container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const RegisterForStreamUseCase = require('use_cases/player/register')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.baseController.createHandler(RegisterForStreamUseCase)
  }
})
