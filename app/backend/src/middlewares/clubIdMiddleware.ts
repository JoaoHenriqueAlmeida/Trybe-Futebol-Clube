import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import StatusCodes from '../utils/StatusCodes';

export const idSchema = Joi.object({
  id: Joi.number().required(),
}).strict();

const clubIdMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  const idToNumber = Number(id);

  const { error } = idSchema.validate({ idToNumber });

  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }

  return next();
};

export default clubIdMiddleware;
