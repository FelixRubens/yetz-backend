class AwsWebsocketManager {
  constructor ({ AWS }) {
    this.apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: 'sy6sxoz7y8.execute-api.us-east-1.amazonaws.com/dev'
    })
  }

  sendMessage ({ connectionId: ConnectionId, content }) {
    if (!this.apigwManagementApi) return Promise.reject()
    return this.apigwManagementApi.postToConnection({ ConnectionId, Data: JSON.stringify(content) }).promise()
      .catch(err => {
        throw new Error(err)
      })
  }
}

module.exports = AwsWebsocketManager