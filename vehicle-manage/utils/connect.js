let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'demo'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createVehicles = `create table if not exists vehicle(
                          id int primary key auto_increment,
                          name varchar(255)not null
                      )`;

  connection.query(createVehicles, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
//更多请阅读：https://www.yiibai.com/mysql/nodejs-create-table.html



  console.log('Connected to the MySQL server.');
});
//更多请阅读：https://www.yiibai.com/mysql/nodejs-connect.html

