import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}
}
