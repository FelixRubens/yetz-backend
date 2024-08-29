exports.up = (knex) => {
  return knex.schema
    .createTable('players', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('skill_level').unsigned().notNullable()
      table.boolean('is_goalkeeper').notNullable()
      table.boolean('is_present').notNullable()
    })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('players')
}
