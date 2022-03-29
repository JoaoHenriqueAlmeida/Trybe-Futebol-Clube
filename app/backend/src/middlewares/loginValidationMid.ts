import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import StatusCodes from '../utils/StatusCodes';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(7),
});

const loginValidationMid = async (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.Unauthorized).json({ message: 'All fields must be filled' });
  }

  const { error } = loginSchema.validate({ email, password });

  console.log(error);

  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }

  return next();
};

export default loginValidationMid;
