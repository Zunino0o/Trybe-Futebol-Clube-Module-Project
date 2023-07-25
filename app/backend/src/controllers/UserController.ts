import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  public static async getRole(_req: Request, res: Response) {
    const { role } = res.locals.userData;

    return res.status(200).json({ role });
  }
}
