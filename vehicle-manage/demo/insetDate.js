let mysql  = require('mysql');
let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
};

let connection = mysql.createConnection(config);

/*// insert statment
let sql = `INSERT INTO vehicle(name)
           VALUES('aaa')`;

// execute the insert statment
connection.query(sql);

connection.end();*/

let stmt = `INSERT INTO vehicle(id,name)
            VALUES(?,?)`;
let ve = ['1010', 'baoma'];

connection.query(stmt, ve, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted id
  console.log('Todo Id:' + results.insertId);
});

connection.end();



