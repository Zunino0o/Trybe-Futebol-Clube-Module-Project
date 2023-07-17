import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', (req: Request, res: Response) =>
  userController.login(req, res));

export default userRouter;
