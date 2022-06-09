let mysql  = require('mysql');
let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
};

let connection = mysql.createConnection(config);

let sql = `UPDATE vehicle SET name = ? WHERE id = ?`

let data = ['mazida', '1014']

connection.query(sql, data, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted id
  console.log('Rows affected:' + results.affectedRows);
});

connection.end();
