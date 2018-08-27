const config = {
  host:'rm-uf614hmyuddi3vx23o.mysql.rds.aliyuncs.com',
  port:3306,
  user:'root',
  password:'1989Zj1011',
  database: 'zijinchi'
};

let knex;
if(typeof config === 'object') {
  const { host, user, password, database, port } = config;
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host,
      user,
      port,
      password,
      database,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
    useNullAsDefault: true,
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 120 * 1000,
  });
} else {
  knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: config,
    },
    useNullAsDefault: true,
  });
}


exports.knex = knex;
