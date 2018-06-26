var data = require('../fn/mysql-db');

exports.AddAuctionProduct = function (body) {
    var sql = `INSERT into user_auction (id_product, email_user, price) value ('${body.id_product}', '${body.username}', '${body.price}')`

    return data.insert(sql)
}

exports.UpdateProductAfterAuction = function(body) {
    var sql = `update product set PricePay = '${body.pricePay}' where Id = '${body.id}'`

    return data.update(sql)
}

exports.SelectTopbyId = function(id) {
    var sql = `SELECT email_user, MAX(price) AS large_price FROM user_auction WHERE id_product = '${id}'`

    return data.load(sql)
}
