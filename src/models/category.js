const mongoose = require('mongoose');
const Product = require('../models/product');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // enum: ['men','women'],
        required: [true, 'Name is required'],
        // minLength: 2,
        // maxLength: 15,
        match : /^[a-zA-Z ']{2,15}$/
        // match : /^[0-9]{10,15}$/
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status : {
        type: Boolean,
        default : true
    },
    order : {
        type: Number,
        default : 1,
        min: 1,
        max: [1000, 'Maximum limit reach']
    },
    created_at : {
        type: Date,
        default : Date.now
    },
    updated_at : {
        type: Date,
        default : Date.now
    },
    deleted_at : {
        type: Date,
        default : ''
    }
});

const category = mongoose.model('Category',categorySchema);

module.exports = category;