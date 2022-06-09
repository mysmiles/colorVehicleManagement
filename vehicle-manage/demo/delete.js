let mysql  = require('mysql');
let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
};

let connection = mysql.createConnection(config);

let sql = `DELETE FROM vehicle WHERE id = ?`

connection.query(sql, 1, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted id
  console.log('Deleted affected:' + results.affectedRows);
});

connection.end();
