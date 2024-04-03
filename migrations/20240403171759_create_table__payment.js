/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payment', (table) => {
    table.string('id').primary();
    table.string('contactId').notNullable().references('id').inTable('contact');
    table.string('pledgeId').notNullable().references('id').inTable('pledge');
    table
      .string('campaignId')
      .notNullable()
      .references('id')
      .inTable('campaign');
    table.date('date').notNullable();
    table.decimal('amount', 16, 2).notNullable();
    table.string('reference');
    table.string('method').notNullable();
    table.text('notes');
    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payment');
};
