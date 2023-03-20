const Pool = require('pg').Pool

const pool = new Pool({
  user: 'uudilgrq',
  password: 'xh0Wt3t2qib_lV7upfRz0uwe5FpshzoS',
  host: 'surus.db.elephantsql.com',
  port: 5432,
  database: 'uudilgrq'
})

module.exports = pool
