
module.exports = {
  createHandler (buildController) {
    const { container, controller } = buildController()
    return async (event, context, callback) => {
      context.callbackWaitsForEmptyEventLoop = false
      const response = await controller(event, context, callback)
      await container.dispose()
      return response
    }
  }
}