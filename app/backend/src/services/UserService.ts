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
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return {
          status: 'INVALID_DATA',
          data: { message: 'Invalid email or password' },
        };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }
}
