const mongoose=require('mongoose');
const Schema=mongoose.schema;
const comment=new Schema({
    content: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
       
    }

})