const awilix = require('awilix')
const AWS = require('aws-sdk')
const knex = require('knex')

const {
  ClientWebsocketController,
  ClientCommunicationManager,
  ConnectionRepository,
  WebsocketManager,
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
    clientWebsocketController: awilix.asClass(ClientWebsocketController).singleton(),
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