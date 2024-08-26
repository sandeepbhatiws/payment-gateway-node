const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use("/uploads/courses",express.static('uploads/courses'));


server.get('/',(request,response) => {
    response.send('Server Working Fine.....');
})

// Backend URls
require('./src/routes/backend/categories.routes')(server);
require('./src/routes/backend/courses.routes')(server);
require('./src/routes/backend/products.routes')(server);


// Frontend URLs
require('./src/routes/frontend/courses.routes')(server);
require('./src/routes/frontend/user.routes')(server);
require('./src/routes/frontend/orders.routes')(server);

server.get('*',(request,response) => {
    response.send('Page not found.....');
})


mongoose.connect('mongodb://127.0.0.1:27017/lms').then(
() => {
    server.listen('5005',() => {
        console.log('Database Connected!');
    });
}).catch((error) => {
    console.log('Database Not Connected!' + error);
});