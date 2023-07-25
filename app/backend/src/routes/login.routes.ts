import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

loginRouter.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default loginRouter;
