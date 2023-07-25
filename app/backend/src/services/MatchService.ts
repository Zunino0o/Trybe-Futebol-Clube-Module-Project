import {
  ServiceMessage,
  ServiceResponse,
  ServiceResponseError,
} from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchUpdate } from '../Interfaces/matches/IMatchUpdate';
import { NewEntity } from '../Interfaces';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  public async getAll(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finish(
    id: IMatch['id'],
  ): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(id);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }

    const update = await this.matchModel.update(id, { inProgress: false });
    if (!update) {
      return {
        status: 'CONFLICT',
        data: { message: `Match ${id} already updated` },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: IMatch['id'],
    data: IMatchUpdate,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(id);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }

    const update = await this.matchModel.update(id, data);
    if (!update) {
      return {
        status: 'CONFLICT',
        data: { message: `Match ${id} already updated` },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  private async validateTeams(ht: number, at: number): Promise<ServiceResponseError | undefined> {
    const homeTeam = await this.teamModel.findById(ht);
    const awayTeam = await this.teamModel.findById(at);
    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    if (homeTeam.id === awayTeam.id) {
      return {
        status: 'UNPPROCESSABLE_ENTITY',
        data: {
          message: 'It is not possible to create a match with two equal teams',
        },
      };
    }
  }

  public async create(
    payload: NewEntity<IMatch>,
  ): Promise<ServiceResponse<IMatch>> {
    const validation = await this.validateTeams(
      payload.homeTeamId,
      payload.awayTeamId,
    );
    if (validation) return { status: validation.status, data: validation.data };

    const newMatch = await this.matchModel.create({
      ...payload,
      inProgress: true,
    });
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
