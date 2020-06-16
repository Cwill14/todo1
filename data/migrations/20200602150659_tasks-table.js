
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('username', 255)
            .notNullable()
            .unique();
        tbl.string('password', 255)
            .notNullable()
            .unique()
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.text('task', 255)
            // .unique()
            .notNullable();
        tbl.boolean('completed')
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('tasks')
};
