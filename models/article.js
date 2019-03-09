const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const article = new Schema({
    name:{
        type: String,
        required: true,
        unique : true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    shortTxt:{
        type: String,
        required: true
    },
    longTxt:{
        type: String,
        required: true  
    },
    date:{
        type: String,
        required: true 
    },
    link:{
        type: String
    },
    pic:{
        type: String
    } 

})

module.exports = mongoose.model("article", article);