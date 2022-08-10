const { getResponse } = require("../common/response");
const {jwtVerifyPromise}=require('../configs/jwt.config');
const { Admin } = require("../models");

module.exports={
    cors(req,res,next){
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Oauth-token, oauth-token");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");//"Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
        next();
    },
    getClientIp:function(req,res,next){
        req.ip=req.connection.remoteAddress;
        next();    
    },
    checkToken:async (req,res,next)=>{
        try{
            let token = req.headers['authorization'] || req.headers['Authorization'];
            if(!token) throw "AUTH_TOKEN REQUIRED";
            token=token.replace("Bearer ","");
            let payload=await jwtVerifyPromise(token);
            req.user=await Admin.findOne({_id:payload._id});
            if(!req.user) throw "User Not Found";
            next();
        }catch(err){
            res.json(getResponse('002',{},err.message || err));
        }
    },
}