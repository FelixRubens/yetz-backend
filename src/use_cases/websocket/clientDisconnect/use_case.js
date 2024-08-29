function clientClientDisconnect ({
  clientCommunicationManager,
  connectionId
}) {
  return clientCommunicationManager.unregisterFromStream({ connectionId })
}

module.exports = clientClientDisconnect
  