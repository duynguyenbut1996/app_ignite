var data = require('../fn/mysql-db')
var md5 = require('md5')

exports.register = (user) => {

    var sql = `INSERT INTO user (Email, PassWord, FullName, Address) VALUES ( '${user.email}', '${md5(user.password)}', '${user.fullname}', '${user.address}')`

    return data.insert(sql)
}
