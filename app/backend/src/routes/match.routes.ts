import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) =>
  matchController.getAll(req, res));

matchRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finish(req, res),
);

matchRouter.patch(
  '/:id',
  Validations.validateToken,
  Validations.validateUpdateBody,
  (req: Request, res: Response) => matchController.update(req, res),
);

matchRouter.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default matchRouter;
