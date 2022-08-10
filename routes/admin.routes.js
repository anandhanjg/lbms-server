const Admin=require('../controllers/admin.controller');
const adminRouter=require('express').Router();
const {checkToken}=require('../middlewares/common.middleware')
adminRouter.post('/login',Admin.login);
adminRouter.use(checkToken);
adminRouter.post('/',Admin.add);
adminRouter.get('/',Admin.fetch);
adminRouter.get('/:id',Admin.get);
adminRouter.patch('/:id',Admin.update);
adminRouter.put('/:id',Admin.update);
adminRouter.delete('/:id',Admin.delete)
adminRouter.post('/fetch',Admin.fetch);
module.exports=adminRouter;