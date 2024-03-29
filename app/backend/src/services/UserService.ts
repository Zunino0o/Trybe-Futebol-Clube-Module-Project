import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import UserModel from '../models/UserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/users/ILogin';
import { IToken } from '../Interfaces/IToken';
import { IUser } from '../Interfaces/users/IUser';

export default class UserService {
  constructor(
    private userModel: UserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(
    data: ILogin,
  ): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }

    const { id, email, role } = user as IUser;
    const token = this.jwtService.sign({ id, email, role });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  // public async getRole(
  //   token: string,
  // ): Promise<ServiceResponse<{ role: string }>> {
  //   const { email } = await this.jwtService.verify(token) as { email: string };
  //   const { role } = await this.userModel.findByEmail(email) as IUser;
  //   return { status: 'SUCCESSFUL', data: { role } };
  // }
}
