module.exports = class ConnectionRepository {
  constructor({ knexMainDatabase }) {
    this._knexDB = knexMainDatabase.instance
  }

  async create(connectionId) {
    const query = this._knexDB.table('connection').insert({
      connection_id: connectionId,
    })

    return query
  }

  async list() {
    const query = this._baseListQuery()
    return query
  }

  async remove(connectionId) {
    const query = this._knexDB.table('connection').where('connection_id', connectionId).delete()
    return query
  }

  _baseListQuery() {
    const query = this._knexDB.table('connection').select({
      id: 'id',
      connectionId: 'connection_id'
    })

    return query
  }
}
