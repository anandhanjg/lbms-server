const User=require('../controllers/user.controller');
const userRouter=require('express').Router();
const {checkToken}=require('../middlewares/common.middleware')
userRouter.use(checkToken);
userRouter.post('/',User.add);
userRouter.get('/',User.fetch);
userRouter.get('/:id',User.get);
userRouter.patch('/:id',User.update);
userRouter.put('/:id',User.update);
userRouter.delete('/:id',User.delete)
userRouter.post('/fetch',User.fetch);

module.exports=userRouter;