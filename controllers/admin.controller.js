const { genAgg } = require('../common/util');
const { getHash, compare } = require('../configs/bcrypt.config');
const {Admin}=require('../models');
const { getResponse } = require("../common/response");
const { jwtSignPromise } = require('../configs/jwt.config');

module.exports={
    profile(req,res){
        let user=JSON.parse(JSON.stringify(req.user));
        delete user.password;
        res.json(getResponse('005',{user}));
    },
    async login(req,res){
        try{
            let {username,password}=req.body;
            console.log(username,password)
            if(!username || !password) throw "Username And Password Required";
            let user=await Admin.findOne({username});
            console.log(user);
            if(!user) throw "Invalid Username";
            if(!(await compare(password,user.password))) throw "Invalid Password";
            let token=await jwtSignPromise({_id:user._id}) ;
            console.log(token);
            res.json(getResponse('001',{token}));
        }catch(e){
            res.json(getResponse('002',{},e.message || e))
        }
    },

    async add(req,res){
        try{
            delete req.body.admin?._id;
            req.body.admin.password=await getHash(req.body.admin.password);
            let admin=await new Admin(req.body.admin).save();
            res.json({admin});
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },

    

    async delete(req,res){
        try{
            let admin=await Admin.deleteOne({_id:req.body._id || req.query._id || req.params.id});
            res.json({message:"ok"});
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },

    async fetch(req,res){
        try{
            let agg=[{
                $unset:["password"]
            },{
                $match:{
                    username:{
                        $ne:req.user.username
                    }
                }
            }];
            agg.push(...genAgg(req.body));
            let admins=await Admin.aggregate(agg);
            res.json({admins});
        }catch(err){
            res.status(500).json({error:err.message || err});
        }
    },

    async get(req,res){
        try{
            let _id=req.query._id || req.params.id;
            let admin=await Admin.findOne({_id});
            admin=JSON.parse(JSON.stringify(admin));
            delete admin.password;
            res.json({admin});
        }catch(err){
            res.status(500).json({error:err.message || err})
        }
    },

    async update(req,res){
        try{
            let _id=req.body.admin._id || req.params.id;
            delete req.body.admin._id;
            if(req.body.admin.password){
                req.body.admin.password=await getHash(req.body.admin.password);
            }else{
                delete req.body.admin.password;
            }

            
            await Admin.updateOne({_id},req.body.admin,{runValidators:true});
            let admin=await Admin.findOne({_id});
            res.json({admin})
        }catch(err){
            res.status(400).json({error:err.message || err});
        }
    }
}