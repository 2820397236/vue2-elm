const knex = require('../knex').knex;
const tableName = 'order';

const createTable = async () => {
  const exist = await knex.schema.hasTable(tableName);
  if(exist) { return; }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('orderId');
    table.string('title');
    table.integer('userId');
    table.integer('planId');
    table.integer('qty');
    table.string('price');
    table.string('status').defaultTo("WAIT");
    table.bigInteger('createTime');
  });
};

exports.createTable = createTable;