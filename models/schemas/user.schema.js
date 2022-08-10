const mongoose=require('mongoose');
const { collections } = require('../../common/const');

const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true,
        min:4,
        max:20
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        min:10,
        max:10
    },
    email:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    collection:collections.users
})

module.exports=userSchema;