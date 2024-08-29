const path = require('path')
const envBase = require('./src/envBase.json')

module.exports = {
  dev: {
    client: 'mysql',
    connection: {
      port: envBase.DB_PORT,
      host: envBase.DB_HOST,
      user: `${envBase.DB_USER}`,
      database: `${envBase.DB_NAME}`,
      password: envBase.DB_PASSWORD,
      options: {
        allowPublicKeyRetrieval: true,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'mySql', 'migrations')
    }
  }
}

