import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';

import { Response } from 'superagent';
import { foundClubsMock } from './mocks/clubsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Em caso de sucesso no método GET do endpoint /clubs', () => {
  let chaiHttpRes:Response;
  
  before(async () => {
    sinon.stub(Clubs, 'findAll').resolves(foundClubsMock as Clubs[])
  })

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  it('Deveria retornar status 200', async () => {
    chaiHttpRes = await chai.request(app).get('/clubs');
    expect(chaiHttpRes.status).to.equal(200);
  })

  it('Deveria retornar um objeto com todos os clubes', async () => {
    chaiHttpRes = await chai.request(app).get('/clubs');
    expect(chaiHttpRes.body).to.deep.equal(foundClubsMock);
  })
})

describe('Em caso de sucesso no método GET do endpoint /clubs:id', () => {
  let chaiHttpRes:Response;
  
  before(async () => {
    sinon.stub(Clubs, 'findAll').resolves([foundClubsMock[0]] as Clubs[])
  })

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  it('Deveria retornar status 200', async () => {
    chaiHttpRes = await chai.request(app).get('/clubs/1');
    expect(chaiHttpRes.status).to.equal(200);
  })

  it('Deve retornar o clube esperado', async () => {
    chaiHttpRes = await chai.request(app).get('/clubs/1');
    expect(chaiHttpRes.body).to.deep.equal([foundClubsMock[0]]);
  })
})