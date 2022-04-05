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

type TeamTypes = { homeTeam:number | string, awayTeam:number | string };

const matchValidationMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  if (awayTeamGoals === undefined || homeTeamGoals === undefined || !inProgress) {
    return res.status(StatusCodes.Unauthorized).json({ message: 'There is no team with such id!' });
  }

  const auth = req.headers.authorization || '';
  const joiMatch:TeamTypes = { homeTeam, awayTeam };
  const { error } = matchSchema.validate({ ...joiMatch, auth });

  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }

  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.Unauthorized).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  return next();
};

export default matchValidationMiddleware;
