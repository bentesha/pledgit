/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('pledge', (table) => {
    table
      .decimal('paidAmount', 16, 2)
      .notNullable()
      .defaultTo(0)
      .after('amount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('pledge', (table) => {
    table.dropColumn('paidAmount');
  });
};
