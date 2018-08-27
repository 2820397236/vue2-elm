const knex = require('../knex').knex;
const tableName = 'users';

const createTable = async () => {
  const exist = await knex.schema.hasTable(tableName);
  if(exist) { return; }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
    table.string('phone');
    table.string('verify');
    table.string('requestId');
    table.integer('money').defaultTo(0);
    table.bigInteger('createTime');
    table.bigInteger('loginTime');
  });
};

exports.createTable = createTable;