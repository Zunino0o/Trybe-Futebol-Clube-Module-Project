import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  leaderboardController.getAllHome(req, res));

leaderboardRouter.get('/away', (req: Request, res: Response) =>
  leaderboardController.getAllAway(req, res));

leaderboardRouter.get('/', (req: Request, res: Response) =>
  leaderboardController.getAll(req, res));

export default leaderboardRouter;
