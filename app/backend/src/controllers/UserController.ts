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

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { status, data } = await this.userService.getRole(authorization as string);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
