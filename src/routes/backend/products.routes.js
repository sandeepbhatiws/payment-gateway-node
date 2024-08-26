
const express = require('express');
const route = express.Router();
const productsController = require('../../controllers/backend/products.controller')

module.exports = app => {

    route.post('/add', productsController.create);

    route.post('/view', productsController.view);


    route.post('update', (request,response) => {

        var result = {
            status : true,
            message : 'Record found successfully.'
        }

        response.send(result);
    })

    route.delete('/delete/:id', productsController.delete)

    app.use('/api/backend/products',route);

}