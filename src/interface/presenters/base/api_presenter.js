module.exports = class ApiPresenter {
  render ({ err, result } = {}) {
    return !err
      ? this._formatSuccessResponse(result)
      : this._formatErrorResponse(err)
  }

  _formatSuccessResponse (result) {
    return {
      statusCode: 200,
      body: {
        message: 'Executado com sucesso!',
        result
      }
    }
  }

  async _formatErrorResponse (err) {
    let message = 'Falha em executar a requisição'
    if (err.message) message = err.message

    return {
      statusCode: err.statusCode || 500,
      body: {
        message,
        code: err.code || 'RequestFail'
      }
    }
  }
}
