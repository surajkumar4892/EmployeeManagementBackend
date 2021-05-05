import {Request,Response} from 'express';
import usersService from "../../dto/users/services/users.service";
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UserController {
    async listUsers(req:Request,res:Response){
        const users = await usersService.list(100,0);
        res.status(200).send(users);
    }

    async getUserById(req:Request,res:Response){
        const user = await usersService.readById(req.body.id)
        res.status(200).send(user);
    }

    async createUser(req:Request,res:Response){
        req.body.password = await argon2.hash(req.body.password);
        const userID = await usersService.create(req.body);
        res.status(201).send({id:userID});
    }

    async patch(req:Request,res:Response){
        if(req.body.password){
            req.body.password = await argon2.hash(req.body.password);
            log(await usersService.patchById(req.body.id,req.body));
            res.status(204).send();
        }
    }

    async put(req:Request,res:Response){
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id,req.body));
        res.status(204).send();
    }

    async removeUser(req:Request,res:Response){
        log(await usersService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new UserController();