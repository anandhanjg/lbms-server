const mongoose=require('mongoose');
const { collections } = require('../../common/const');

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true,
    collection:collections.admins
});

module.exports=adminSchema;