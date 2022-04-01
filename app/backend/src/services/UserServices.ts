import fs = require('fs');
import jwt = require('jsonwebtoken');
import bcryptjs = require('bcryptjs');
import Users from '../database/models/Users';
import responseGenerator from '../utils/resGenerator';
import StatusCodes from '../utils/StatusCodes';
import checkJWT from '../utils/checkJWT';

interface IUserLogin {
  email:string,
  password: string,
}

export const login = async ({ email, password }:IUserLogin) => {
  const getByEmail = await Users.findOne({ where: { email } });

  const invalidCredentials = 'Incorrect email or password';

  if (!getByEmail) { return responseGenerator(StatusCodes.Unauthorized, invalidCredentials); }

  const checkPassword = await bcryptjs.compare(password, getByEmail.password);

  if (!checkPassword) { return responseGenerator(StatusCodes.Unauthorized, invalidCredentials); }

  const jwtKey = fs.readFileSync('jwt.evaluation.key', 'utf8').trim();
  const token = jwt.sign({ email }, jwtKey);

  const payload = {
    user: {
      id: getByEmail.id,
      username: getByEmail.username,
      role: getByEmail.role,
      email: getByEmail.email,
    },
    token,
  };

  return responseGenerator(StatusCodes.OK, '', payload);
};

export const getUserRole = async (authorization:string) => {
  const user = await checkJWT(authorization);

  if (!user) {
    return responseGenerator(StatusCodes.Unauthorized, 'Invalid Token');
  }

  return responseGenerator(StatusCodes.OK, '', user.role);
};
