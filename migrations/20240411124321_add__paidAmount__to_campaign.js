/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('campaign', (table) => {
    table
      .decimal('paidAmount', 16, 2)
      .notNullable()
      .defaultTo(0)
      .after('pledgedAmount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('campaign', (table) => {
    table.dropColumn('paidAmount');
  });
};
