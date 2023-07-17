import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAll();
    res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { status, data } = await this.teamService.getById(
      Number(req.params.id),
    );
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
