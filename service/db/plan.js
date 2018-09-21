const knex = require('../knex').knex;
const tableName = 'plan';

const createTable = async () => {
  const exist = await knex.schema.hasTable(tableName);
  if(exist) { return; }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('title');
    table.string('subtitle');
    table.string('desc');
    table.string('price').defaultTo(0);
    table.integer('equity').defaultTo(0);
    table.integer('rate').defaultTo(0);
    table.bigInteger('createTime');
  });
};

exports.createTable = createTable;