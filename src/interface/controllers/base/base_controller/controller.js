class BaseController {
  constructor(container) {
    this.container = container
  }

  createHandler (UseCase) {
    return async (event) => {
      return new UseCase(this.container, event.body).execute()
    }
  }
}

module.exports = BaseController
