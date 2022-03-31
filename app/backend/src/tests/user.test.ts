import * as sinon from 'sinon';
import * as chai from 'chai';
import bcryptjs = require('bcryptjs');
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users'

import { Response } from 'superagent';
import { foundUserMock, loginResponseMock, accurateRequestInfo } from './mocks/userMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Em caso de sucesso no método POST do endpoint /login:', () => {
  let chaiHttpRes:Response ;
  
  before(async () => {
    sinon.stub(Users, 'findOne').resolves(foundUserMock as Users);
    sinon.stub(bcryptjs, 'compare').resolves(true);
  })

  after(async () => {
    (Users.findOne as sinon.SinonStub).restore();
    (bcryptjs.compare as sinon.SinonStub).restore();
  })

  it('Deveria retornar status 200', async () => {
    chaiHttpRes = await chai.request(app).post('/login').send(accurateRequestInfo);
    const { status } = chaiHttpRes;
    expect(status).to.equal(200);
  })

  it('O id do usuário encontrado deve ser igual ao id esperado', async () => {
    chaiHttpRes = await chai.request(app).post('/login').send(accurateRequestInfo);
    const { id } = chaiHttpRes.body.user;
    expect(id).to.be.equal(loginResponseMock.user.id);
    
  })

  it('O username do usuário encontrado deve ser igual ao username esperado', async () => {
    chaiHttpRes = await chai.request(app).post('/login').send(accurateRequestInfo);
    const { username } = chaiHttpRes.body.user;
    expect(username).to.be.equal(loginResponseMock.user.username);
  })

  it('A role do usuário encontrado deve ser igual a role esperada', async () => {
    chaiHttpRes = await chai.request(app).post('/login').send(accurateRequestInfo);
    const { role } = chaiHttpRes.body.user;
    expect(role).to.be.equal(loginResponseMock.user.role);
  })

  it('O email do usuário encontrado deve ser igual ao email esperado', async () => {
    chaiHttpRes = await chai.request(app).post('/login').send(accurateRequestInfo);
    const { email } = chaiHttpRes.body.user;
    expect(email).to.be.equal(loginResponseMock.user.email);
  })

})