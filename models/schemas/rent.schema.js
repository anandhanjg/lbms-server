const mongoose=require('mongoose');
const { collections } = require('../../common/const');

const rentSchema=new mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },
    userId:{   
        type:String,
        required:true
    },
    borrowDate:{
        type:Date,
        default:function(){
            return new Date();
        }
    },
    dueDate:{
        type:Date,
        default:function(){
            return new Date(Date.now()+(30*24*60*60*1000));
        }
    },
    returned:{
        type:Boolean,
        default:false
    },
    returnedDate:{
        type:Date,
        default:null
    }
},{
    timestamps:true,
    collection:collections.rents
});

module.exports=rentSchema;