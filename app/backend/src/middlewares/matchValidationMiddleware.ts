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

const verifyTeamsEquality = (teamOne:number, teamTwo:number) => (
  teamOne === teamTwo ? 'It is not possible to create a match with two equal teams' : ''
);

const matchValidationMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  if (awayTeamGoals === undefined || homeTeamGoals === undefined || !inProgress) {
    return res.status(StatusCodes.Unauthorized).json({ message: 'There is no team with such id!' });
  }

  const auth = req.headers.authorization || '';
  type TeamTypes = { homeTeam:number | string, awayTeam:number | string };
  const joiMatch:TeamTypes = { homeTeam, awayTeam };
  const { error } = matchSchema.validate({ ...joiMatch, auth });

  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }

  const getEqualityInfo = verifyTeamsEquality(homeTeam, awayTeam);
  if (getEqualityInfo) {
    return res.status(StatusCodes.Unauthorized).json({ message: getEqualityInfo });
  }

  return next();
};

export default matchValidationMiddleware;
