const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./Pizza database.db',(err)=>{

    if(err){
        console.log(err.message)
    }
    console.log('connected to database')

    db.close((err)=>{

        if(err) {
            console.log(err.message)
        }
    })
    console.log('database closed')
})