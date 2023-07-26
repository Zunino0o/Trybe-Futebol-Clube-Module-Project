import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamScores from '../utils/TeamScores';
import getResult from '../utils/getResult';
import sortOutput from '../utils/sortOutput';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getAllHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const finishedMatches = await this.matchModel.findAll('false');
    const scores = (await this.teamModel.findAll()).map(
      (data) => new TeamScores(data.teamName),
    );
    finishedMatches.forEach((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;
      const result = getResult(homeTeamGoals, awayTeamGoals);

      scores[homeTeamId - 1].setResult(result, homeTeamGoals, awayTeamGoals);
    });
    const result = scores.map((team) => team.getData());
    return { status: 'SUCCESSFUL', data: sortOutput(result) };
  }

  public async getAllAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const finishedMatches = await this.matchModel.findAll('false');
    const scores = (await this.teamModel.findAll()).map(
      (data) => new TeamScores(data.teamName),
    );
    finishedMatches.forEach((match) => {
      const { awayTeamId, homeTeamGoals, awayTeamGoals } = match;
      const result = getResult(awayTeamGoals, homeTeamGoals);

      scores[awayTeamId - 1].setResult(result, awayTeamGoals, homeTeamGoals);
    });
    const result = scores.map((team) => team.getData());
    return { status: 'SUCCESSFUL', data: sortOutput(result) };
  }

  public async getAll(): Promise<ServiceResponse<ILeaderboard[]>> {
    const finishedMatches = await this.matchModel.findAll('false');
    const scores = (await this.teamModel.findAll()).map(
      (data) => new TeamScores(data.teamName),
    );
    finishedMatches.forEach((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;
      const homeResult = getResult(homeTeamGoals, awayTeamGoals);
      const awayResult = getResult(awayTeamGoals, homeTeamGoals);

      scores[homeTeamId - 1].setResult(homeResult, homeTeamGoals, awayTeamGoals);
      scores[awayTeamId - 1].setResult(awayResult, awayTeamGoals, homeTeamGoals);
    });
    const result = scores.map((team) => team.getData());
    return { status: 'SUCCESSFUL', data: sortOutput(result) };
  }
}
