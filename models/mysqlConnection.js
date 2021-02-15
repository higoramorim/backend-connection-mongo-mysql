const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'higoramorim',
  database: 'live_lecture_27_1',
  port: '3306',
});