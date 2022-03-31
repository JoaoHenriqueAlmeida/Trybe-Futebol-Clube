import { Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';
import { getAllClubs, getClubById } from '../services/ClubServices';

export const getAll = async (req:Request, res:Response) => {
  const { status, message, data } = await getAllClubs();

  if (status >= StatusCodes.BadRequest) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(data);
};

export const getById = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { status, message, data } = await getClubById(Number(id));

  if (status >= StatusCodes.BadRequest) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(data);
};
