var mysql = require('../fn/mysql-db')
var jwt = require('jsonwebtoken')
var md5 = require('md5')

exports.signup = (params) => {
    let defaultParams = {
        idAdmin: 0
    }

    params = Object.assign(defaultParams, params)

    if (!params.email || !params.password || !params.address || !params.fullname) {
        let error = new Error('Validation fail, input is invalid.')
        return Promise.reject(error)
    }

    console.log('herer')

    let query = `INSERT INTO user (Email, Password, FullName, Address, isAdmin) VALUES('${params.email}', '${md5(params.password)}', '${params.fullname}', '${params.address}', ${params.idAdmin})`
    let insert = mysql.insert(query)
    return insert
        .then(result => {
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.signin = (body) => {
    if (!body.email || !body.password) {
        let error = new Error('Email & password can\'t be empty')
        return Promise.reject(error)
    } else {
        const ACTIVE = 1;
        console.log(md5(body.password))
        let query = `SELECT * FROM user WHERE Email = '${body.email}' AND PassWord = '${md5(body.password)}' AND isReal = ${ACTIVE}`
        return mysql.load(query)
    }
}

exports.authResponse = (user) => {
    if (user[0]) {
        let payload = {
            'email': user[0].Email,
            'isAdmin': user[0].isAdmin === 1 ? 1 : 0
        }
        let token = jwt.sign(payload, 'secret')
        return {
            user: user,
            token: token
        }
    } else {
        return new Error('Validation fail')
    }
}
