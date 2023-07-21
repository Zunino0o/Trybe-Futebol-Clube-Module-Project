import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import { ITeam } from '../Interfaces/teams/ITeam';
// import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ICRUDModelReader<ITeam> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }
}
