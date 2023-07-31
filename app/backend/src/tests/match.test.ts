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
import { validToken } from './mocks/login.mock';

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
  });

  describe('POST "/"', () => {
      it('Sucesso', async () => {
        sinon.stub(SequelizeMatch, 'create').resolves(matchMock as any);

        const { status, body } = await chai
            .request(app)
            .post('/matches')
            .send(validCreateMatchMock)
            .set('Authorization', validToken);
            
      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchMock);
      });

      it('Falha', async () => {
        sinon.stub(SequelizeMatch, 'create').resolves(errorMessage as any);

        const { status, body } = await chai
            .request(app)
            .post('/matches')
            .send(invalidCreateMatchMock)
            .set('Authorization', validToken);
            
      expect(status).to.equal(422);
      expect(body).to.deep.equal(errorMessage);
      });
    })
});
