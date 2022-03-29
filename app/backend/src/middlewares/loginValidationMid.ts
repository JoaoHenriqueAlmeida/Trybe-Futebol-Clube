import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import StatusCodes from '../utils/StatusCodes';

const notEmpty = 'All fields most be filled';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.required': notEmpty,
    'string.email': 'Incorrect email or password',
    'string.empty': notEmpty,
  }),
  password: Joi.string().required().min(7).messages({
    'string.required': notEmpty,
    'string.empty': notEmpty,
  }),
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
