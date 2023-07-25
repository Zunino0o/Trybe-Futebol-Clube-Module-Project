import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static validateLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const split = authorization.split(' ');
    const decodedToken = await JWT.verify(split[1]);
    if (decodedToken === 'Token must be a valid token') {
      return res.status(401).json({ message: decodedToken });
    }

    res.locals.userData = decodedToken;

    next();
  }

  static validateUpdateBody(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Missing data' });
    }

    next();
  }
}
