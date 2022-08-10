const { genAgg } = require('../common/util');
const {BookRent, Book, User}=require('../models');
const { getResponse } = require("../common/response")
module.exports={
    async add(req,res){
        try{
            let rentData=req.body.rent;
            delete rentData._id;
            delete rentData.returnedDate;

            if(!rentData.bookId || !rentData.userId) throw "UserId and BookId Required";

            if(!(await Book.findOne({bookId:rentData.bookId}))){
                throw "Invalid BookId";
            }

            if(!(await User.findOne({userId:rentData.userId}))){
                throw "Invalid UserId";
            }

            if((await BookRent.findOne({bookId:rentData.bookId,returned:false}))){
                throw "Book Already Hold By Someone Else";
            }

            

            
            let rent=await new BookRent(req.body.rent).save();
            res.json({rent})
        }catch(err){
            res.status(500).json(
                {
                    errors:{
                        msg:err.message || err
                    }
                }
            );
        }
    },

    async delete(req,res){
        try{
            let rent=await BookRent.deleteOne({_id:req.body._id || req.query._id || req.params.id});
            res.json({message:'ok'})
        }catch(err){
            res.status(500).json({error:err.message||err});
        }
    },

    async fetch(req,res){
        try{
            let agg=[
                {
                    $sort:{
                        createdAt:-1
                    }
                }
            ]
            agg.push(...genAgg(req.body));
            let rents=await BookRent.aggregate(agg);
            res.json({rents})
        }catch(err){
            res.status(500).json({error:err.message||err});
        }
    },

    async get(req,res){
        try{
            let _id=req.query._id || req.params._id;
            let rent=await BookRent.findOne({_id});
            res.json({rent})
        }catch(err){
            // res.json(getResponse('006',{},err.message || err))
            res.status(500).json({error:err.message||err});
        }
    },

    async update(req,res){
        try{
            console.log(req.body);
            let _id=req.body.rent._id || req.params.id;
            delete req.body.rent._id;
            let x=await BookRent.updateOne({_id},req.body.rent,{runValidators:true});
            console.log(x);
            let rent=await BookRent.findOne({_id});
            res.json({rent})
        }catch(err){
            res.status(500).json({error:err.message||err});
            // res.json(getResponse('008',{},err.message || err))
        }
    }
}