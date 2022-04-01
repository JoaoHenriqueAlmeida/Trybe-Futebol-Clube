import { Request, Response } from 'express';
import { login, getUserRole } from '../services/UserServices';
import StatusCodes from '../utils/StatusCodes';

export const userLogin = async (req:Request, res:Response) => {
  const { email, password } = req.body;

  const { status, message, data } = await login({ email, password });
  if (status >= StatusCodes.BadRequest) {
    res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};

export const userAuthentication = async (req:Request, res:Response) => {
  const authorization = req.headers.authorization || '';

  const { status, message, data } = await getUserRole(authorization);
  if (status >= StatusCodes.BadRequest) {
    res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};

export const disableLint = '';
