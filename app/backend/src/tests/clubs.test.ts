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
    const { status, body } = chaiHttpRes;
    expect(status).to.equal(200);
    expect(body).to.be.equal(foundClubsMock);
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
    const { status, body } = chaiHttpRes;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(foundClubsMock[0]);
  })
})