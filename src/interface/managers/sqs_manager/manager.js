const { v4: uuidV4 } = require('uuid')

class SqsManager {
  constructor ({
    AWS
  }) {
    this.queueName = 'websocket_queue'
    this.queueUrl = ''
    this.minimumReceivedMessagesRetry = 2
    this.maxRetries = 3
    this.messageGroupId = undefined
    this.sqsService = new AWS.SQS({ apiVersion: '2012-11-05' })
  }

  async sendMessage (content) {
    const params = {
      MessageBody: JSON.stringify(content),
      QueueUrl: this.queueUrl
    }

    console.log('sendinding', params)

    if (this.messageGroupId) {
      params.MessageGroupId = this.messageGroupId
      params.MessageDeduplicationId = uuidV4()
    }

    let response
    try {
      response = await this.sqsService.sendMessage(params).promise()
    } catch (err) {
      console.log(err)
      throw new Error() 
    }

    return response
  }
}

module.exports = SqsManager
