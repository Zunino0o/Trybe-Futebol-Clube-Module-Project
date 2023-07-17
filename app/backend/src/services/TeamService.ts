import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}
}
