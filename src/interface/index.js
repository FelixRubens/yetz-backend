const repositories = {
  PlayerRepository: require('./repositories/mysql/playerRepository'),
  ConnectionRepository: require('./repositories/mysql/connectionRepository')
}

const controllers = {
  BaseController: require('./controllers/base/base_controller'),
  ClientWebsocketController: require('./controllers/base/client_websocket_controller'),
  SqsController: require('./controllers/base/sqs_controller')
}

const presenters = {
  BaseApiPresenter: require('./presenters/base')
}

const managers = {
  WebsocketManager: require('./managers/websocket_manager'),
  ClientCommunicationManager: require('./managers/client_communication_manager'),
  SqsManager: require('./managers/sqs_manager')
}

const SqsController = require('./controllers/base/sqs_controller/controller')
const { KnexMainDatabase } = require('./main_database')

module.exports = {
  ...repositories,
  ...controllers,
  ...managers,
  ...presenters,
  KnexMainDatabase,
}
