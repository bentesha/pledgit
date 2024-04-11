/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('campaign', (table) => {
    table
      .specificType(
        'unpaidAmount',
        'DECIMAL(16, 2) AS (pledgedAmount - paidAmount) STORED',
      )
      .after('paidAmount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('campaign', (table) => {
    table.dropColumn('unpaidAmount');
  });
};
