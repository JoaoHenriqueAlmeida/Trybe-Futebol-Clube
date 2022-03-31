import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import StatusCodes from '../utils/StatusCodes';

export const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const clubIdMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;

  const { error } = idSchema.validate({ id });

  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }

  return next();
};

export default clubIdMiddleware;
