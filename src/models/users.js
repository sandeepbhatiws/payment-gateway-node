const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match : /^[a-zA-Z ]{2,20}$/
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
    },
    mobile_number : {
        type : String,
        required : [true, 'Mobile Number is required'],
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
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

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;