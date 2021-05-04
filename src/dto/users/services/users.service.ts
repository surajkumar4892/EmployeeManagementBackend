import { CRUD } from '../../../common/crud.interface';
import { CreateUserDto } from '../create.user.dto';
import usersDao from '../daos/users.dao';
import { PatchUserDto } from '../patch.user.dto';
import { PutUserDto } from '../put.user.dto';

class UsersService implements CRUD<CreateUserDto,PatchUserDto,PutUserDto>{

    async create(resource:CreateUserDto){
        return usersDao.addUser(resource);
    }

    async deleteById(id:string){
        return usersDao.removeUserById(id);
    }

    async list(limit:number,page:number){
        return usersDao.getUsers();
    }

    async patchById(id:string,resource:PatchUserDto){
        return usersDao.patchUserById(id,resource);
    }

    async readById(id:string){
        return usersDao.getUserById(id);
    }

    async putById(id:string,resource:PutUserDto){
        return usersDao.putUserById(id,resource);
    }

    async getUserByEmail(email:string){
        return usersDao.getUserByEmail(email)
    }

}

export default new UsersService();