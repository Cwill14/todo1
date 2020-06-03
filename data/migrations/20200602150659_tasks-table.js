
exports.up = function(knex) {
    return knex.schema.createTable('tasks', tbl => {
        tbl.increments();
        tbl.text('task', 255)
            .unique()
            .notNullable();
        tbl.boolean('completed')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tasks')
};