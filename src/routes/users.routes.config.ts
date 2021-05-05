import { CommonRoutesConfig } from '../common/common.routes.config';
import { Application } from 'express';
import UserController from '../controllers/users/users.controller';
import UserMiddleware from '../middlewares/user/users.middleware';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes():Application {

        this.app
            .route(`/users`)
            .get(UserController.listUsers)
            .post(
                UserMiddleware.validateRequiredUserBodyFileds,
                UserMiddleware.validateSameEmailDoesntExist,
                UserController.createUser
            );

        this.app.param(`userId`,UserMiddleware.extractUserId);
        
        this.app
            .route(`/users/:userId`)
            .all(UserMiddleware.validateUserExists)
            .get(UserController.getUserById)
            .delete(UserController.removeUser);

        this.app.put(`/users/:userId`,[
            UserMiddleware.validateRequiredUserBodyFileds,
            UserMiddleware.validateSameEmailBelongToSameUser,
            UserController.put,
        ]);

        this.app.patch(`/users/:userId`,[
            UserMiddleware.validatePatchEmail,
            UserController.patch,
        ])

        return this.app;
    }
}