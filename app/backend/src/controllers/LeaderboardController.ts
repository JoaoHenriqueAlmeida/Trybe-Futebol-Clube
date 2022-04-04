import { Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';
import LeaderboardServices from '../services/LeaderboardServices';

export const getAll = async (req:Request, res:Response) => {
  const { status, message, data } = await LeaderboardServices({
    filterByHome: true, filterByAway: true,
  });

  if (status >= StatusCodes.NotFound) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(data);
};

export const filterByHome = async (req:Request, res:Response) => {
  const { status, message, data } = await LeaderboardServices({
    filterByHome: true, filterByAway: false,
  });

  if (status >= StatusCodes.NotFound) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

export const filterByAway = async (req:Request, res:Response) => {
  const { status, message, data } = await LeaderboardServices({
    filterByHome: false, filterByAway: true,
  });

  if (status >= StatusCodes.NotFound) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};
