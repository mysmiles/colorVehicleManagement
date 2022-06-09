var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
});

const HTTP = function (sql) {
  return new Promise((success, error) => {
    //从连接池里捞出一条空闲连接
    pool.getConnection(function (err, connection) {
      connection.query(sql, (err, result) => {
        //释放连接回池
        connection.release();
        if (err) {
          error({
            code: 500,
            errorMsg: err
          })
          console.log('连接失败', err.message);
        }else{
          success({
            code: 200,
            data: result
          });
        }
      });
    });
  })
}

module.exports = {
  HTTP: HTTP
}
