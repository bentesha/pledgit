/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('pledge', (table) => {
    table
      .specificType(
        'unpaidAmount',
        'DECIMAL(16, 2) AS (amount - paidAmount) STORED',
      )
      .after('paidAmount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('pledge', (table) => {
    table.dropColumn('unpaidAmount');
  });
};
