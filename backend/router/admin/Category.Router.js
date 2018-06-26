var express = require('express')
var CategoryService = require('../../service/CategoryService')

let router = express.Router()

router.get('', (request, response) => {
    console.log('get');
    
    return CategoryService.list()
        .then(params => {
            return response.render('index', {
                title: 'Management categories',
                content: params.template,
                categories: params.categories
            })
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

router.get('/:product_id/detail', (request, response) => {
    return CategoryService.get(request.params.product_id)
        .then(params => {
            return response.render('index', {
                title: 'View category detail',
                content: params.template,
                category: params.category
            })
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

router.get('/add', (request, response) => {
    return response.render('index', {
        title: 'Create new category',
        content: 'category/edit.ejs',
        category: null
    }) 
})

router.get('/:product_id/edit', (request, response) => {
    return CategoryService.get(request.params.product_id)
        .then(params => {
            return response.render('index', {
                title: 'Edit a category',
                content: 'category/edit.ejs',
                category: params.category
            })
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

router.post('/add', (request, response) => {
    return CategoryService.add(request.body)
        .then(params => {
            return response.redirect('http://localhost:5555/admin/categories');
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

router.post('/edit', (request, response) => {
    return CategoryService.edit(request.body)
        .then(params => {
            return response.redirect('http://localhost:5555/admin/categories');
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

router.delete('/:product_id/delete', (request, response) => {
    return CategoryService.delete(request.params.product_id)
        .then(params => {
            return response.redirect('http://localhost:5555/admin/categories');
        })
        .catch(err => {
            return response.status(400).send(err)
        })
})

module.exports = router;
