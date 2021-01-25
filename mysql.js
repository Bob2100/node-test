const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'worth',
  socketPath: '/tmp/mysql.sock'
}

const con = mysql.createConnection(config);
con.connect(err => {
  if (err) {
    throw err;
  }
  console.log('连接成功');
});