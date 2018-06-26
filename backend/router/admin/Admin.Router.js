var express = require('express')
var UserService = require('../../service/UserService')
var UserRoutes = require('./User.Router')
var ProductRoutes = require('./Product.Router')
var CategoryRoutes = require('./Category.Router')

let router = express.Router()

router.get('', (request, response) => {
    return  response.render('index', {
                title: 'Management Admin',
                content:"admin/index.ejs",
    }
        )
})

router.get('/requestes', (request, response) => {
    
})

router.use('/users', UserRoutes)
router.use('/products', ProductRoutes)

router.use('/categories', CategoryRoutes)


router.get('/categories', (request, response) => {

})

module.exports = router;
