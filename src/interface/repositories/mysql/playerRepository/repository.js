module.exports = class PlayerRepository {
  constructor({ knexMainDatabase }) {
    this._knexDB = knexMainDatabase.instance
  }

  async create({ name, skillLevel, isGoalkeeper }) {
    const query = this._knexDB.table('players').insert({
      name,
      skill_level: skillLevel,
      is_goalkeeper: isGoalkeeper,
      is_present: false
    })

    return query
  }

  async list() {
    const query = this._baseListQuery()
    return query
  }

  async updatePresent(playerId, value) {
    const query = this._knexDB.table('players').update({
      is_present: value
    }).where('id', playerId)

    return query
  }

  _baseListQuery() {
    const query = this._knexDB.table('players').select({
      id: 'id',
      name: 'name',
      skillLevel: 'skill_level',
      isGoalkeeper: 'is_goalkeeper',
      isPresent: 'is_present'
    })

    return query
  }
}
