import { Router, Request, Response } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/home');

leaderboardRouter.get('/away');

leaderboardRouter.get('/');

export default leaderboardRouter;
