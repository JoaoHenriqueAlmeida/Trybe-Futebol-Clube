import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import StatusCodes from '../utils/StatusCodes';

const matchSchema = Joi.object({
  homeTeam: Joi.required(),
  awayTeam: Joi.required(),
  authorization: Joi.string().required().messages({
    'string.required': 'Invalid Token',
    'string.empty': 'Invalid Token',
  }),
}).strict();

const matchValidationMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const auth = req.headers.authorization || '';

  if (!awayTeamGoals || !homeTeamGoals || !inProgress) {
    return res.status(StatusCodes.Unauthorized).json({ message: 'There is no team with such id!' });
  }

  const { error } = matchSchema.validate({ ...match, auth });
  return next();
};

export default matchValidationMiddleware;
