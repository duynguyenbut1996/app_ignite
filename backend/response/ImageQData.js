var data = require('../fn/mysql-db');

exports.createImageProduct = function(image) {
    var sql = `INSERT INTO image (Image1, Image2, Image3) VALUES ('${image.ImageFirst}', '${image.ImageSecond}', '${image.Image3rd}')`

    return data.insert(sql)
}
