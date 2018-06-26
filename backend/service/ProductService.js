var mysql = require('../fn/mysql-db')

exports.list = () => {
    const query = 'SELECT * FROM `product`'
    const products = mysql.load(query)
    return products
        .then(result => {
            const params = {
                template: 'product/index.ejs',
                products: result
            }
            return Promise.resolve(params)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}
