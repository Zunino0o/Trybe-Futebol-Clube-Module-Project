import { NewEntity } from '../Interfaces';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const user = await this.model.create(data);
    const { id, username, role, email, password } = user;
    return { id, username, role, email, password };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, role, username, email, password }) => ({
      id,
      role,
      username,
      email,
      password,
    }));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { username, role, email, password } = user;
    return { id, username, role, email, password };
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }

  async update(id: IUser['id'], data: Partial<IUser>): Promise<IUser | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: IUser['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
