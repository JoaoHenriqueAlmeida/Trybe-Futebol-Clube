import Matches from '../database/models/Matches';
import Clubs from '../database/models/Clubs';

import responseGenerator from '../utils/resGenerator';
import StatusCodes from '../utils/StatusCodes';

export const getMatchesArray = async () => {
  const matchesArray = await Matches.findAll({
    include: [
      { model: Clubs, as: 'homeClubs', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchesArray.length) {
    return responseGenerator(StatusCodes.NotFound, 'Coud not find any Matches');
  }

  return responseGenerator(StatusCodes.OK, '', matchesArray);
};

export const getInProgressMatches = async (inProgress: boolean) => {
  const matchesArray = await Matches.findAll({
    where: { inProgress },
    include: [
      { model: Clubs, as: 'homeClubs', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (!matchesArray.length) {
    return responseGenerator(StatusCodes.NotFound, 'Coud not find any Matches');
  }

  return responseGenerator(StatusCodes.OK, '', matchesArray);
};
