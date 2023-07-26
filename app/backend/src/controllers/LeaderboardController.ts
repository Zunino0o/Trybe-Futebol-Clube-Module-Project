import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getAllHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllHome();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  public async getAllAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllAway();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAll();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
