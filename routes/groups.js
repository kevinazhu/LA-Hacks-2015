var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '104.236.199.139',
    user : 'root',
    password : 'k3AHc3DruW',
    database : 'la',
    port : 3306,
    socket : '/var/run/mysqld/mysqld.sock'
});


connection.connect(function(err) {
    if(err)
	console.log(err);
});

connection.query('SELECT * from GROUPS;', function(err, rows, fields) {
    if (!err)
	console.log('The solution is: ', rows);
    else
	console.log('Error while performing query: ' + err);
});

connection.end();
