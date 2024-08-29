const { createContainer } = require('./container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const UpdatePresentUseCase = require('use_cases/player/updatePresent')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.baseController.createHandler(UpdatePresentUseCase)
  }
})
