import { Request, Response } from 'express';
import login from '../services/UserServices';
import StatusCodes from '../utils/StatusCodes';

export const userLogin = async (req:Request, res:Response) => {
  const { email, password } = req.body;

  const { status, message, data } = await login({ email, password });
  console.log(status);
  console.log(message);
  console.log(data);
  if (status >= StatusCodes.BadRequest) {
    res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};

export const disableLint = '';
