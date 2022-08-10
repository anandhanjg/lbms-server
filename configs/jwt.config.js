require('dotenv').config();
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=process.env;
const {promisify}=require('util')

const jwtSign=(payload,cb,option)=>{
    if(!option)
        option={expiresIn:"1000d"}
    jwt.sign(payload,JWT_SECRET,option,(err,token)=>{
        if(err) return cb(err.message);
        else return cb(null,token);
    });
}

const jwtVerify=(token,cb)=>{
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
            return cb(err.message);
        else
            return cb(null,payload);
    })
}

module.exports={
    jwtSign,
    jwtVerify,
    jwtVerifyPromise:promisify(jwtVerify),
    jwtSignPromise:promisify(jwtSign)
}

