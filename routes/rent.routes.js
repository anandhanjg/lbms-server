const Rent=require('../controllers/rent.controller');
const rentRouter=require('express').Router();
const {checkToken}=require('../middlewares/common.middleware')
rentRouter.use(checkToken);
// rentRouter.post('/',Rent.add);
// rentRouter.get('/',Rent.get);
// rentRouter.put('/',Rent.update);
// rentRouter.delete('/',Rent.delete)
// rentRouter.post('/fetch',Rent.fetch);
rentRouter.post('/',Rent.add);
rentRouter.get('/',Rent.fetch);
rentRouter.get('/:id',Rent.get);
rentRouter.patch('/:id',Rent.update);
rentRouter.put('/:id',Rent.update);
rentRouter.delete('/:id',Rent.delete)
rentRouter.post('/fetch',Rent.fetch);
module.exports=rentRouter;