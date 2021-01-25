const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  socketPath: '/tmp/mysql.sock'
}

const con = mysql.createConnection(config);

const CREAT_SQL = `CREATE TABLE IF NOT EXISTS test  (
  id int(0) NOT NULL AUTO_INCREMENT,
  message varchar(45) NULL,
  PRIMARY KEY (id)
)`;
const INSERT_SQL = `INSERT INTO test set ?`;
const SELECT_SQL = `SELECT * FROM test`;

con.connect(err => {
  if (err) {
    throw err;
  }
  console.log('连接成功');
  con.query(CREAT_SQL, err => {
    if (err) {
      throw err;
    }
    console.log('表创建成功');
    con.query(INSERT_SQL, { message: 'test5' }, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('插入数据成功：', result);
      con.query(SELECT_SQL, (err, results) => {
        if (err) {
          throw err;
        }
        console.log('查询数据成功：', results);
        con.end();
      });
    });
  });
});