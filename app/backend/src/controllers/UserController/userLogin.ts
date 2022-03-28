import { Request, Response } from 'express';

import userLogin from '../../services/UserServices';

const userLogin = async (req:Request, res:Response) => {
  const { email, password } = req.body;

  const { status, data } = await UserServices.userLogin({ email, password });
  return res.status(status).json(data);
};

export default userLogin;
