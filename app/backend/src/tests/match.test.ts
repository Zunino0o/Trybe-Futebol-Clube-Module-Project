import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
// @ts-ignore
import chaiHttp = require('chai-http');

import SequelizeMatch from '../database/models/SequelizeMatch';
import {
  allMatchesMock,
  matchMock,
  validCreateMatchMock,
  invalidCreateMatchMock,
  errorMessage,
} from './mocks/match.mock';

import { app } from '../app';
import { invalidToken, invalidTokenErrorMessage, validToken } from './mocks/login.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

describe('Testes de rota /matches', () => {
  beforeEach(sinon.restore);

  describe('GET "/"', () => {
    it('Sucesso', async () => {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesMock as any);

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesMock);
    });

    it('Sucesso para partidas em progresso', async () => {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesMock[1] as any);

      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesMock[1]);
    });

    it('Sucesso para partidas finalizadas', async () => {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesMock[0] as any);

      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesMock[0]);
    });
  });

  describe('POST "/"', () => {
    it('Sucesso', async () => {
      sinon.stub(SequelizeMatch, 'create').resolves(matchMock as any);
      sinon.stub(JWT, 'verify').returns({ id: 1, email: 'valid@user.com', role: 'user' });

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(validCreateMatchMock)
        .set('Authorization', validToken);
      console.log(status, body);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchMock);
    });

    it('Falha por token invalido', async () => {
        sinon.stub(SequelizeMatch, 'create').resolves(invalidTokenErrorMessage as any);
  
        const { status, body } = await chai
          .request(app)
          .post('/matches')
          .send(validCreateMatchMock)
          .set('Authorization', invalidToken);
  
        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidTokenErrorMessage);
      });

    it('Falha por time duplicado', async () => {
      sinon.stub(SequelizeMatch, 'create').resolves(errorMessage as any);
      sinon.stub(JWT, 'verify').returns({ id: 1, email: 'valid@user.com', role: 'user' });

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(invalidCreateMatchMock)
        .set('Authorization', validToken);

      expect(status).to.equal(422);
      expect(body).to.deep.equal(errorMessage);
    });
  });
});
