import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import StatusCodes from '../utils/StatusCodes';

export const schemeMatch = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  authorization: Joi.string().required().messages({
    'string.required': 'Invalid Token',
    'string.empty': 'Invalid Token',
  }),
}).strict();

const verifyTeamEquality = (firstTeam: number, secondTeam: number) => {
  if (firstTeam === secondTeam) {
    return 'It is not possible to create a match with two equal teams';
  } return '';
};

type MatchJoi = { homeTeam: number | string, awayTeam: number | string };

const matchValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  if (awayTeamGoals === undefined || homeTeamGoals === undefined || !inProgress) {
    return res.status(StatusCodes.Unauthorized).json({ message: 'There is no team with such id!' });
  }
  const { authorization } = req.headers;
  const match: MatchJoi = { homeTeam, awayTeam };
  const { error } = schemeMatch.validate({ ...match, authorization });
  console.log(error);
  if (error) {
    return res.status(StatusCodes.Unauthorized).json({ message: error.message });
  }
  const verifyEquality = verifyTeamEquality(homeTeam, awayTeam);
  if (verifyEquality) {
    return res.status(StatusCodes.Unauthorized).json({ message: verifyEquality });
  }
  return next();
};

export default matchValidationMiddleware;
