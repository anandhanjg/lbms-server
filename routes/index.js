const adminRouter = require("./admin.routes");
const bookRouter = require("./book.routes");
const rentRouter = require("./rent.routes");
const userRouter = require("./user.routes");

module.exports.setRoutes=(app,express)=>{
    app.get('/',(req,res)=>{
        res.json({message:'success'});
    });

    app.use('/admins',adminRouter);
    app.use('/users',userRouter);
    app.use('/books',bookRouter);
    app.use('/rents',rentRouter);
}