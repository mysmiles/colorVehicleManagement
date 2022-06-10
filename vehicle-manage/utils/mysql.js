let mysql = require('mysql');
let sqlConfig = require('../config/index.js')

let pool = mysql.createPool({
  host: sqlConfig.database.host,
  user: sqlConfig.database.user,
  password: sqlConfig.database.password,
  port: sqlConfig.database.port,
  database: sqlConfig.database.database
});

const HTTP = (sql, values) => {
  return new Promise((resolve, reject) => {
    //从连接池里捞出一条空闲连接
    pool.getConnection(function (err, connection) {
      connection.query(sql, values, (err, result) => {
        //释放连接回池
        connection.release();
        if (err) {
          reject({
            code: 500,
            errorMsg: err
          })
          console.log('连接失败', err.message);
        }else{
          resolve({
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
