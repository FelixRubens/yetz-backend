const { createContainer } = require('./container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const StreamDataUseCase = require('use_cases/player/sendData')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.sqsController.createHandler(StreamDataUseCase)
  }
})
