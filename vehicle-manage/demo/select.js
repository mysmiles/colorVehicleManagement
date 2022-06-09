let mysql  = require('mysql');
let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
};

let connection = mysql.createConnection(config);

/*let sql = `SELECT * FROM vehicle`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});*/

/*let sql = `SELECT * FROM vehicle WHERE name=?`;
connection.query(sql, ['baoma'], (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});*/

// 防止sql注入
let id = process.argv[2]
// let sql = `SELECT * FROM vehicle WHERE id=${id}`;
let sql = `SELECT * FROM vehicle WHERE id=` + mysql.escape(id);
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end();
