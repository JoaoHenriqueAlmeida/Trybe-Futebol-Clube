import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../utils/StatusCodes';
import { getMatchesArray, getInProgressMatches, insertNewMatch } from '../services/MatchServices';
import IMatch from '../interfaces/IMatch';

export const getAll = async (req:Request, res:Response, next:NextFunction) => {
  const { status, message, data } = await getMatchesArray();

  const { inProgress } = req.query;
  if (inProgress) {
    next();
  }

  if (status >= StatusCodes.Unauthorized) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};

export const getInProgress = async (req:Request, res:Response) => {
  const { inProgress } = req.query;

  const { status, message, data } = await getInProgressMatches(inProgress === 'true');

  if (status >= StatusCodes.Unauthorized) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};

export const createNewMatch = async (req:Request, res:Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const auth = req.headers.authorization || '';
  const match:IMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };

  const { status, message, data } = await insertNewMatch(match, auth);
  if (status >= StatusCodes.Unauthorized) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};
