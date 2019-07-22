const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db.js')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)
//开始连接
con.connect()
//执行sql
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
