const mongoose = require('mongoose');
const Category = require('../models/category');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    category_id: { 
        type: mongoose.Types.ObjectId, 
        ref: "Category"
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

const product = mongoose.model('products',productSchema);

module.exports = product;