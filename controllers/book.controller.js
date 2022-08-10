const { genAgg } = require('../common/util');
const {Book}=require('../models');
const { getResponse } = require("../common/response");
const { collections } = require('../common/const');
module.exports={
    async search(req,res){
        try{
            if(!req.body.searchTxt) throw "Search Txt Required";

            let reg={$regex:new RegExp(req.body.searchTxt,'ig')}
            
            let agg=[
                {
                    $match:{
                        $or:[
                            {
                                name:reg
                            },
                            {
                                author:reg
                            },
                            {
                                bookId:reg
                            }
                        ]
                    }
                },
                ...genAgg(req.body),
                {
                    $lookup:{
                        from:collections.rents,
                        let:{
                            bid:"$bookId"
                        },
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $eq:["$bookId","$$bid"]
                                    },
                                    returned:false
                                }
                            },
                            {
                                $lookup:{
                                    from:collections.users,
                                    localField:"userId",
                                    foreignField:"userId",
                                    as:"user"
                                }
                            },
                            {
                                $addFields:{
                                    user:{
                                        $arrayElemAt:["$user",0]
                                    }
                                }
                            }
                        ],
                        as:'rent'
                    }
                },
                {
                    $addFields:{
                        available:{
                            $cond:[{$eq:[{$size:"$rent"},0]},true,false]
                        },
                        rent:{
                            $arrayElemAt:["$rent",0]
                        }
                    }
                }
            ];
            let books=await Book.aggregate(agg);
            res.json({books});
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },
    async add(req,res){
        try{
            delete req.body.book._id;
            let book=await new Book(req.body.book).save();
            res.status(200).json({book})
        }catch(err){
            res.status(500).json({error:err.message || err})
        }
    },

    async delete(req,res){
        try{
            let book=await Book.deleteOne({_id:req.body._id || req.query._id || req.params.id});
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
            let books=await Book.aggregate(agg);
            // res.json(getResponse('005',{books}))
            res.status(200).json({books});
        }catch(err){
            res.status(500).json({error:err.message || err});
            // res.json(getResponse('006',{},err.message || err))
        }
    },

    async get(req,res){
        try{
            let _id=req.query._id || req.params.id;
            console.log(req.params.id);
            let book=await Book.findOne({_id});
            res.json({book})
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },

    async update(req,res){
        try{
            let _id=req.body?.book?._id || req.params.id;
            delete req.body.book?._id;
            console.log(req.body);
            let updateResult=await Book.updateOne({_id},req.body.book,{runValidators:true});

            console.log(updateResult);
            let book=await Book.findOne({_id});
            res.json({book})
        }catch(err){
            res.status(500).json({error:err.message || err})
        }
    }
}