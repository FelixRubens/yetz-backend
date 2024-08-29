function clientSendClientConnectionId ({
  clientCommunicationManager,
  connectionId
}) {
  return clientCommunicationManager.sendConnectionId(connectionId)
}

module.exports = clientSendClientConnectionId
  