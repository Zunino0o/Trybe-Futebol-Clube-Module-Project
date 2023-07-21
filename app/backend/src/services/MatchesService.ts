import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class MatchesService {
  constructor(private matchesModel: MatchesModel = new MatchesModel()) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
