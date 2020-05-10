const { Pool } = require('pg')
const pool = new Pool({
    host:'localhost',
    user: 'database-user',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

function getAll(){
    pool
        .query('select * from test')
        .then(res => {return res.rows[0]})
        .catch(e => {console.log(e); return e})
}
