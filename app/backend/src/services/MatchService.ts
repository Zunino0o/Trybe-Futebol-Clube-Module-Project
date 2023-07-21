import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchesModel: MatchModel = new MatchModel()) {}

  public async getAll(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
