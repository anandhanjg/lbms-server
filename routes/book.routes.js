const Book=require('../controllers/book.controller');
const bookRouter=require('express').Router();

const {checkToken}=require('../middlewares/common.middleware')
bookRouter.post('/search',Book.search);

bookRouter.use(checkToken);
bookRouter.post('/',Book.add);
bookRouter.get('/',Book.fetch);
bookRouter.get('/:id',Book.get);
bookRouter.patch('/:id',Book.update);
bookRouter.put('/:id',Book.update);
bookRouter.delete('/:id',Book.delete)
bookRouter.post('/fetch',Book.fetch);
module.exports=bookRouter;