const development = {
  database: 'testmysql_nodejs',
  username: 'sujay',
  password: '123456',
  host: '192.168.3.92',
  dialect: 'mysql',
};

const testing = {
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql' ,
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect:  'mysql',
};

module.exports = {
  development,
  testing,
  production,
};
