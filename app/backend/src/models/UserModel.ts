import { NewEntity } from '../Interfaces';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const newUser = await this.model.create(data);
    return newUser;
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll({
      attributes: { exclude: ['password'] },
    });
    return dbData;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return null;
    return user;
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: { email },
    });
    if (!user) return null;
    return user;
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
