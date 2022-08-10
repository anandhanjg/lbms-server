const bcrypt=require('bcrypt');
const saltRounds=10;
async function getHash(p,cb){
    let e,hash;
    try{
        let salt=await bcrypt.genSalt(saltRounds);
        hash=await bcrypt.hash(p,salt);
    }catch(err){
        e=err;
    }
    if(e){
        return cb?cb(e):Promise.reject(e);
    }else{
        return cb?cb(null,hash):Promise.resolve(hash);
    }
}

function compare(p,h,cb){
    if(cb){
        bcrypt.compare(p,h,function(err,result){
            cb(err,result);
        });
    }else{
        return bcrypt.compare(p,h);
    } 
}


module.exports={
    getHash,
    compare,

}
