const CODE=require('./const').RESPONSE_CODE_PREFIX;

const responses=[
    {
        code:CODE+'001',
        message:'User Authorized Successfully',
        success:true
    },
    {
        code:CODE+'002',
        message:'User Auth Error',
        success:false
    },
    {
        code:CODE+'003',
        message:'Add Data Successfully',
        success:true
    },
    {
        code:CODE+'004',
        message:'Failed To Add Data',
        success:false
    },
    {
        code:CODE+'005',
        message:'Data Retrieved Successfully',
        success:true
    },
    {
        code:CODE+'006',
        message:'Data Couldn\'t Be Retrieved Successfully',
        success:false
    },
    {
        code:CODE+'007',
        message:'Data Updated Successfully',
        success:true
    },
    {
        code:CODE+'008',
        message:'Failed To Update Data',
        success:false
    },
    {
        code:CODE+'009',
        message:'Data Deleted Successfully',
        success:true
    },
    {
        code:CODE+'010',
        message:'Failed To Delete Data',
        success:false
    }
]


module.exports.getResponse=(code,payload,message)=>{
    return responses.find(response=>{
        if(response.code==CODE+code){
            let r=response;
            if(payload)
                r.payload=payload
            if(message)
                r.message=message
            return r
        }
    });
}
