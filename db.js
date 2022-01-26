const mysql = require('mysql2/promise')


const pool = mysql.createPool({
  user: "root",
  password: "n%SDAYFVs6f6w5h",
  host: "localhost",
  port: 3306,
  database: "test"
});

module.exports = pool;