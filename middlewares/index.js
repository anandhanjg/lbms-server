const { cors, getClientIp } = require("./common.middleware");

module.exports.setMiddlewares=(app,express)=>{
    app.use(cors);
    app.use(getClientIp);

    app.use(express.json({limit:'150mb'}));
    app.use(express.urlencoded({extended:false}))

}

module.exports.setStatic=(app,express)=>{
    app.use(express.static('./public'));
}