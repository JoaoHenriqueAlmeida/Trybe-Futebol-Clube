import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/Users';
import responseGenerator from '../utils/resGenerator';
import StatusCodes from '../utils/StatusCodes';

interface IUserLogin {
  email:string,
  password: string,
}

const login = async ({ email, password }:IUserLogin) => {
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

export default login;
