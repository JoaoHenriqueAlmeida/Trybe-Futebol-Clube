import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import Users from '../database/models/Users';

export const getUserByToken = async (decoded:string | jwt.JwtPayload) => {
  if (typeof decoded === 'object') {
    const user = await Users.findOne({ where: { email: decoded.email } });
    return user;
  } return '';
};

export const checkJWT = async (token:string) => {
  const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8').trim();
  const verifiedToken = jwt.verify(token, JWT_SECRET);
  const user = await getUserByToken(verifiedToken);
  return user;
};
