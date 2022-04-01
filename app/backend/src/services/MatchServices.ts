import Matches from '../database/models/Matches';
import Clubs from '../database/models/Clubs';

import responseGenerator from '../utils/resGenerator';
import StatusCodes from '../utils/StatusCodes';
import checkJWT from '../utils/checkJWT';

import IMatch from '../interfaces/IMatch';

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

export const createNewMatch = async (match:IMatch, token:string) => {
  try {
    const user = await checkJWT(token);

    if (!user) { return responseGenerator(StatusCodes.Unauthorized, 'Invalid Token'); }

    const [homeTeamId, awayTeamId] = await Promise.all([
      Clubs.findOne({ where: { id: match.homeTeam } }),
      Clubs.findOne({ where: { id: match.awayTeam } }),
    ]);

    if (!homeTeamId || awayTeamId) {
      return responseGenerator(StatusCodes.Unauthorized, 'There is no team with such id!');
    }
  } catch (error) {

  }
};
