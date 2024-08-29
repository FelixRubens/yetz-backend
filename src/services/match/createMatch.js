const { createContainer } = require('./container')
const { createHandler } = require('interface/controllers/base/aws_lambda_handler')
const CreateMatchUseCase = require('use_cases/match/create')

module.exports.handler = createHandler(() => {
  const container = createContainer()
  return {
    container,
    controller: container.cradle.baseController.createHandler(CreateMatchUseCase)
  }
})
