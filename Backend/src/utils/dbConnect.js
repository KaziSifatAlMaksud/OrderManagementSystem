const mysql = require('mysql');

const connection = mysql.createConnection({
    // host: 'sql6.freesqldatabase.com',
    // user: 'sql6703921',
    // password: 'lzPih8SQxY',
    // database: 'sql6703921'

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

async function dbConnect() {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
    });
}

module.exports = { dbConnect, connection };