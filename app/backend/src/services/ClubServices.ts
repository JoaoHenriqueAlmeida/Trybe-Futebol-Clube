import StatusCodes from '../utils/StatusCodes';
import Clubs from '../database/models/Clubs';
import responseGenerator from '../utils/resGenerator';

export const getAllClubs = async () => {
  const allClubs = await Clubs.findAll();

  if (!allClubs) {
    return responseGenerator(StatusCodes.NotFound, 'Could not find any Teams');
  }

  return responseGenerator(StatusCodes.OK, '', allClubs);
};

export const getClubById = async (id:number) => {
  const club = await Clubs.findOne({ where: { id } });

  if (!club) {
    return responseGenerator(StatusCodes.NotFound, 'Could not find a Team with this id');
  }

  return responseGenerator(StatusCodes.OK, '', club);
};
