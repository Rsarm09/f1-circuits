const mysql = require('mysql2');

//main database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formulaone'
});

db.connect( (err) => {
    if (err) {
        console.log('Error: ', err);
        return;
    }
    console.log('Connected');
});

module.exports = db;