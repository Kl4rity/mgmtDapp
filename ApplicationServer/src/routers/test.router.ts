import {Router, Request, Response} from 'express';

const testRouter : Router = Router();

testRouter.get('/user/:id', (req : Request, res: Response)=>{
    res.send(req.params.id);
});

export default testRouter;