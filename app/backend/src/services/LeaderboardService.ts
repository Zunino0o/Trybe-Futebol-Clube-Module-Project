import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}
}
