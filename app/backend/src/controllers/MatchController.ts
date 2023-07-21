import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.getAll(inProgress as string | undefined);
    return res.status(200).json(serviceResponse.data);
  }

  public async finish(req: Request, res: Response) {
    const { status, data } = await this.matchService.finish(Number(req.params.id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  public async update(req: Request, res: Response) {
    const { status, data } = await this.matchService.update(Number(req.params.id), req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
