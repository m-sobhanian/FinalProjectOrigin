const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    
    phone: {
        type: String,
        required: true,
    },
  
    sex: {
        type: String,
        required: true
    },
    role: {
         type: String,
         required: true
     },
     pic: {
         type: String
     }
});

module.exports = mongoose.model('user', user);