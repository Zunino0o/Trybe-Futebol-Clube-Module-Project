import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const match = await this.model.create(data);
    return match;
  }

  private static progressCheck(inProgress?: string) {
    return !inProgress ? {} : { where: { inProgress: inProgress === 'true' } };
  }

  async findAll(inProgress?: string): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      ...MatchModel.progressCheck(inProgress),
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

  async findById(id: IMatch['id']): Promise<IMatch | null> {
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
    id: IMatch['id'],
    data: Partial<IMatch>,
  ): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: IMatch['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
