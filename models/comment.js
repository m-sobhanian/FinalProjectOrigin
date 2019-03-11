const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const comment=new Schema({
    name: {
        type: String,
        required: true
       
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    article: {
        type: Schema.Types.ObjectId,
        ref: 'article'
    }

})

module.exports = mongoose.model("comment", comment);