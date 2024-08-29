class SqsController {
  constructor(container) {
    this.container = container
  }

  createHandler (UseCase) {
    return async ({ Records }) => {
      const promisses = Records.map(({ body, ...record }) => {
        const data = JSON.parse(body)
        return new UseCase(this.container, { ...record, ...data })
          .execute()
          .catch(err => console.log(err))
      })
      
      await Promise.all(promisses)
      return true
    }
  }
}

module.exports = SqsController
  