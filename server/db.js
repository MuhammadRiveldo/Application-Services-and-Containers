const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'db',
  port: 5432,
  database: 'pern-todo',
});

module.exports = pool;
