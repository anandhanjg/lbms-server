const {Types:{ObjectId}}=require('mongoose');
module.exports={
    genAgg:({page,size,sortBy,order})=>{
        console.log("HI");
        let agg=[];
        
        if(sortBy){
            agg.push({
                $sort:{
                    [sortBy]:order?order:1
                }
            })
        }

        if(page && typeof page=='number' && size && typeof size=='number'){
            agg.push({
                $skip:page*size-size
            })
        }

        if(size && typeof size=='number'){
            agg.push({
                $limit:size
            })
        }

        return agg;
    },
    getObjectId:id=>(ObjectId(id)),
    isEmptyObject:(obj)=>(Object.keys(obj).length==0),
}