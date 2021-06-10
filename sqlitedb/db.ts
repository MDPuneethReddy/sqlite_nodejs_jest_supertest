// var sqlite3 = require('sqlite3').verbose()
import * as sqlite3 from "sqlite3"
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE,(err:any) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        const sqlCreate=
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE,
            CONSTRAINT email_unique UNIQUE (email)
            );`;
        db.run(sqlCreate, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful creation of the 'users' table");
        });
    }
})
export default db