const { genAgg } = require('../common/util');
const {User}=require('../models');
const { getResponse } = require("../common/response")
module.exports={
    async add(req,res){
        try{
            delete req.body.user._id;
            let user=await new User(req.body.user).save();
            res.status(200).json({user})
        }catch(err){
            res.status(500).json({error:err.message || err})
        }
    },

    async delete(req,res){
        try{
            let user=await User.deleteOne({_id:req.body._id || req.query._id || req.params.id});
            res.json({message:'ok'});
            // res.json(getResponse('009',{}))
        }catch(err){
            res.status(500).json({error:err.message || err})
            // res.json(getResponse('010',{},err.message || err))
        }
    },

    async fetch(req,res){
        try{
            let agg=[{
                $sort:{
                    createdAt:-1
                }
            }]
            agg.push(...genAgg(req.body));
            let users=await User.aggregate(agg);
            // res.json(getResponse('005',{users}))
            res.status(200).json({users});
        }catch(err){
            res.status(500).json({error:err.message || err});
            // res.json(getResponse('006',{},err.message || err))
        }
    },

    async get(req,res){
        try{
            let _id=req.query._id || req.params.id;
            console.log(req.params.id);
            let user=await User.findOne({_id});
            res.json({user})
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },

    async update(req,res){
        try{
            let _id=req.body?.user?._id || req.params.id;
            delete req.body.user?._id;
            console.log(req.body);
            let updateResult=await User.updateOne({_id},req.body.user,{runValidators:true});

            console.log(updateResult);
            let user=await User.findOne({_id});
            res.json({user})
        }catch(err){
            res.status(500).json({error:err.message || err})
        }
    }
}