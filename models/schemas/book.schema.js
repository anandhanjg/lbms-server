const mongoose=require('mongoose');
const { collections } = require('../../common/const');


const bookSchema=new mongoose.Schema({
    bookId:{
        type:String,
        unique:true,
        required:true,
        max:20
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    collection:collections.books
});

module.exports=bookSchema;