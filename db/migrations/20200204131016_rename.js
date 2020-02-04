
exports.up = function(knex) {
  return knex.schema.table('palettes', function(table) {
    table.renameColumn('color-four', 'color_four')
  })
};

exports.down = function(knex) {
  return knex.schema.table('palettes', function(table) {
    table.renameColumn('color_four', 'color-four')
  })
};
