const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../../sqlite/Pizza database.db', (err) =>{
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to database')
    }
});