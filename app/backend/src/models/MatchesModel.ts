import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const match = await this.model.create(data);
    return match;
  }

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          foreignKey: 'homeTeamId',
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          foreignKey: 'awayTeamId',
        },
      ],
    });
    return dbData;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const match = await this.model.findByPk(id, {
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          foreignKey: 'homeTeamId',
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          foreignKey: 'awayTeamId',
        },
      ],
    });
    if (!match) return null;
    return match;
  }

  async update(
    id: IMatches['id'],
    data: Partial<IMatches>,
  ): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: IMatches['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
