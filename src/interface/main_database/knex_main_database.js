module.exports = class KnexMainDatabase {
  constructor({ Knex }) {
    this.knex = Knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
      },
      debug: true
    })
  }

  get instance () {
    return this.knex
  }

  endConnection () {
    if (this.knex) {
      this.knex.destroy()
      this.knex = null
      console.log('DB connection destroyed!')
    }
  }
}
