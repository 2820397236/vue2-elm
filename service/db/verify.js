const knex = require('../knex').knex;
const tableName = 'verify';

const createTable = async () => {
  const exist = await knex.schema.hasTable(tableName);
  if(exist) { return; }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('phone');
    table.string('verify');
    table.string('requestId');
    table.bigInteger('expireTime');
  });
};

exports.createTable = createTable;