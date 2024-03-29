import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import TeamModel from '../models/TeamModel';
// import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(private teamModel: ICRUDModelReader<ITeam> = new TeamModel()) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
