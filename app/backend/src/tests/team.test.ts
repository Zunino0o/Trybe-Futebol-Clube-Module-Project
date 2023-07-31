import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeamsMock, teamMock, errorMock } from './mocks/team.mock';

import { app } from '../app';

chai.use(chaiHttp);

describe('Testes de rota /teams', () => {
  beforeEach(sinon.restore);

  describe('GET "/"', () => {
    it('Sucesso', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves(allTeamsMock as any);

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allTeamsMock);
    });
  });

  describe('GET "/:id"', () => {
    it('Sucesso', async () => {
      sinon.stub(SequelizeTeam, 'findOne').resolves(teamMock as any);

      const { status, body } = await chai.request(app).get('/teams/12');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamMock);
    });

    it('Falha', async () => {
      sinon.stub(SequelizeTeam, 'findOne').resolves(null);

      const { status, body } = await chai.request(app).get('/teams/69');

      expect(status).to.equal(errorMock.status);
      expect(body).to.deep.equal(errorMock.body);
    });
  });
});
