
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    })
    .createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('color_one');
      table.string('color_two');
      table.string('color_three');
      table.string('color-four');
      table.string('color_five');
      table.integer('projects_id').unsigned();
      table.foreign('projects_id').references('projects.id');
      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('projects')
    .dropTable('palettes')
};
