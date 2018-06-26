var express = require('express');
var imageRepo = require('../../response/ImageQData')

var router = express.Router()

router.post('/', (req, res) => {
    imageRepo.createImageProduct(req.body).then((image) => {
        res.json(image)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router
