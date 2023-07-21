import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  public async getAll(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finish(id: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(id);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    }

    const update = await this.matchModel.update(id, { inProgress: false });
    if (!update) {
      return { status: 'CONFLICT', data: { message: `Match ${id} already updated` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
