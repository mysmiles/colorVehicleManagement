let mysql  = require('mysql');
let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
};

let connection = mysql.createConnection(config);

let stmt = `INSERT INTO vehicle(id, name)  VALUES ?  `;
let ves = [
  ['1014', 'biyadi'],
  ['1011', 'benchi'],
  ['1012', 'aodi'],
];

connection.query(stmt, [ves], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted id
  console.log('Todo Id:' + results.affectedRows);
});

connection.end();
