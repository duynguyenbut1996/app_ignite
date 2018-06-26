var mysql = require('../fn/mysql-db')

exports.list = () => {
    const query = 'SELECT * FROM `catergory`'
    const categories = mysql.load(query)
    return categories
        .then(result => {
            const params = {
                template: 'category/index.ejs',
                categories: result
            }
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.get = (id) => {
    const query = 'SELECT * FROM `catergory` WHERE Id = "' + id + '"'
    const category = mysql.load(query)
    return category
        .then(result => {
            console.log('result', result[0])
            const params = {
                template: 'category/detail.ejs',
                category: result[0]
            }
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.add = (params) => {
    const query = 'INSERT INTO `catergory` (Id, catergoryname) VALUES ("' + params.id + '", "' + params.category_name + '")'
    const category = mysql.insert(query)
    return category
        .then(result => {
            const params = {
                template: 'category/detail.ejs',
                category: result[0]
            }
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.edit = (params) => {
    const query = 'UPDATE `catergory` SET catergoryname="' + params.category_name + '" WHERE Id = "' + params.id + '"'
    const category = mysql.update(query)
    return category
        .then(result => {
            const params = {
                template: 'category/index.ejs',
                category: result[0]
            }
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.delete = (id) => {
    const query = 'DELETE FROM `catergory` WHERE Id = "' + id + '"'
    const category = mysql.delete(query)
    return category
        .then(result => {
            return Promise.resolve(result)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}
