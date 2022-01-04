// Get the mysql service
var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node-boilerplate'
});

// connect to mysql
connection.connect(function(err) {
    if(!err) {
        console.log('Connection Established Successfully');
    } else {
        // in case of error
        console.log('Connection Failed!' + err.code);
        console.log('Connection Failed!' + err.fatal);
    }
});

module.exports = connection;