const express = require('express');
const route = express.Router();
const defaultController = require('../../controllers/backend/default.controller')


module.exports = app => {

    route.post('/add', defaultController.create);

    route.post('/view', defaultController.view);

    route.post('update', defaultController.update)

    route.delete('/delete/:id', defaultController.delete)

    app.use('/api/backend/default',route);

}
