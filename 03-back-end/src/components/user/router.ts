import IRouter from '../../common/IRouter.interface';
import { Application } from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import UserController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

export default class UserRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const userController = new UserController(resources);

        application.get("/user",   AuthMiddleware.getVerifier("administrator","user"),      userController.getAll.bind(userController));
        application.get("/user/:id",   AuthMiddleware.getVerifier("administrator","user"),  userController.getById.bind(userController));
        application.post("/user",     AuthMiddleware.getVerifier("administrator"),   userController.add.bind(userController));
        application.put("/user/:id",  AuthMiddleware.getVerifier("administrator"),   userController.edit.bind(userController));
        application.delete("/user/:id",AuthMiddleware.getVerifier("administrator"),  userController.delete.bind(userController));
        application.post("/auth/user/register",AuthMiddleware.getVerifier("administrator"), userController.register.bind(userController));
    }
}
