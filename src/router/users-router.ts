import { Router } from 'express';
import usersController from "../controller/users-controller";
const usersRouter : Router = Router();
usersRouter.get('/',usersController.getAllusersHandler);
usersRouter.get('/:id',usersController.getUserByIdHandler);

export default usersRouter;