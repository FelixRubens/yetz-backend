const awilix = require('awilix')
const knex = require('knex')
const AWS = require('aws-sdk')

const {
  ClientWebsocketController,
  SqsController,
  ClientCommunicationManager,
  ConnectionRepository,
  WebsocketManager,
  PlayerRepository,
  BaseController,
  BaseApiPresenter,
  KnexMainDatabase
} = require('interface')

const createContainer = () => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  })
  
  container.register({
    baseController: awilix.asClass(BaseController).singleton(),
    apiPresenter: awilix.asClass(BaseApiPresenter).singleton(),
    knexMainDatabase: awilix.asClass(KnexMainDatabase).singleton().disposer(db => db.endConnection()),
    playerRepository: awilix.asClass(PlayerRepository).singleton(),
    clientWebsocketController: awilix.asClass(ClientWebsocketController).singleton(),
    sqsController: awilix.asClass(SqsController).singleton(),
    clientWebsocketManager: awilix.asClass(WebsocketManager).singleton(),
    clientCommunicationManager: awilix.asClass(ClientCommunicationManager).singleton(),
    connectionRepository: awilix.asClass(ConnectionRepository).singleton(),
    
    Knex: awilix.asValue(knex),
    STAGE: awilix.asValue(process.env.GLOBAL_STAGE),
    AWS: awilix.asValue(AWS)
  })


  return container
}

module.exports = {
  createContainer
}