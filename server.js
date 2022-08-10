const express=require('express');
const app=express();
const mongoConnect=require('./configs/mongoose.config');
const { setMiddlewares, setStatic } = require('./middlewares');
const { setRoutes } = require('./routes');

setMiddlewares(app,express);
setRoutes(app,express);
setStatic(app,express);

mongoConnect.connection.on('connected',async ()=>{
    app.listen(4500,()=>{
        console.log("Server is Running On Port 4500");
    })
});

