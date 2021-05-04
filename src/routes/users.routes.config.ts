import { CommonRoutesConfig } from '../common/common.routes.config';
import { Application, Request, Response, NextFunction } from 'express';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes() {
        this.app.route('/user')
            .get((req: Request, res: Response) => {
                res.status(200).send(`list of users`);
            })
            .post((req: Request, res: Response) => {
                res.status(200).send(`post to the user`);
            })
        

        this.app.route('/user/:userId')
            .all((req:Request,res:Response,next:NextFunction)=>{
                next();
            })
            .get((req:Request,res:Response)=>{
                res.status(200).send(`get requested for ID ${req.params.userId}`);
            })
            .put((req:Request,res:Response)=>{
                res.status(200).send(`put requested for ID ${req.params.userId}`);
            })
            .patch((req:Request,res:Response,)=>{
                res.status(200).send(`patch requested for ID ${req.params.userId}`);
            })
            .delete((req:Request,res:Response)=>{
                res.status(200).send(`delete requested for ID ${req.params.userId}`)
            })

        return this.app;
    }
}