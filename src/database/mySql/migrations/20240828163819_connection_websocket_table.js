exports.up = (knex) => {
  return knex.schema
    .createTable('connection', (table) => {
      table.increments('id').primary()
      table.string('connection_id').notNullable()
    })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('connection')
}
