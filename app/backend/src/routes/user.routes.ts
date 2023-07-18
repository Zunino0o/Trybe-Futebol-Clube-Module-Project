import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', Validations.validateLogin, (req: Request, res: Response) =>
  userController.login(req, res));

userRouter.get('/role', Validations.validateToken, (req: Request, res: Response) =>
  userController.getRole(req, res));

export default userRouter;
