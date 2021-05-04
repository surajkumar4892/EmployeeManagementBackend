import {CreateUserDto} from '../create.user.dto';
import {PutUserDto} from '../put.user.dto';
import {PatchUserDto} from '../patch.user.dto';

import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UserDao {
    users:Array<CreateUserDto> = []

    constructor(){
        log('created new instance of UsersDao');
    }

    async addUser(user:CreateUserDto){
        user.id=shortid.generate();
        this.users.push(user);
        return user.id;
    }

    async getUsers(){
        return this.users;
    }

    async getUserById(userId:string){
        return <CreateUserDto>this.users.find((user:{id:string})=>user.id === userId);
         
    }

    async putUserById(userId:string,user:PutUserDto){
        const objectInedx = this.users.findIndex((obj:{id:string})=>obj.id===userId);
        //@ts-ignore
        this.users.splice(objectInedx, 1, user);
        return `${user.id} updated via put`;
    }

    async patchUserById(userId:string,user:PatchUserDto){
        const objectIndex = this.users.findIndex((obj:{id:string})=>obj.id===userId);
        let currentUser = this.users[objectIndex];
        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel'
        ];
        for (let field of allowedPatchFields){
            if(field in user){
                //@ts-ignore
                currentUser[field]=user[field];
            }
        }

        this.users.splice(objectIndex,1,currentUser);
        return `${user.id} patched`;
    }

    async removeUserById(userId:string){
        const objIndex = this.users.findIndex((obj:{id:string})=>{obj.id === userId});
        this.users.splice(objIndex,1);
        return `${userId} removed`
    }

    async getUserByEmail(email:string){
        const objIndex = this.users.findIndex((obj:{email:string})=>{obj.email===email});
        let curretUser = this.users[objIndex];
        if(curretUser){
            return curretUser;
        }else{
            return null;
        }
    }
}

export default new UserDao();