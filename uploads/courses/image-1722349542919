
const express = require('express');
const route = express.Router();
const categoryController = require('../../controllers/backend/categories.controller')

module.exports = app => {

    route.post('/add', categoryController.create);

    route.post('/view', categoryController.view);


    route.post('update', (request,response) => {

        var result = {
            status : true,
            message : 'Record found successfully.'
        }

        response.send(result);
    })

    route.delete('/delete/:id', categoryController.delete)

    app.use('/api/backend/categories',route);

}