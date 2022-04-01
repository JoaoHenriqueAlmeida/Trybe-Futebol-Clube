import jwt = require('jsonwebtoken');
import fs = require('fs');
import Users from '../database/models/Users';

const checkJWT = async (token:string) => {
  const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8').trim();
  const verifiedUser = jwt.verify(token, jwtSecret);

  if (typeof verifiedUser === 'object') {
    const user = await Users.findOne({ where: { email: verifiedUser.email } });
    return user;
  }

  return 0;
};

export default checkJWT;
