const knex = require('../knex').knex;
const tableName = 'cashflow';

const createTable = async () => {
  const exist = await knex.schema.hasTable(tableName);
  if(exist) { return; }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('outId');
    table.integer('userId');
    table.bigInteger('value');
    table.string('type').defaultTo("CASH");
    table.string('status').defaultTo("IN");
    table.bigInteger('createTime');
  });
};

exports.createTable = createTable;