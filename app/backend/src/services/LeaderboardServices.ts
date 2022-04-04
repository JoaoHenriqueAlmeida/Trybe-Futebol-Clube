import Clubs from '../database/models/Clubs';

import responseGenerator from '../utils/resGenerator';
import StatusCodes from '../utils/StatusCodes';
import getMatchesFromEachTeam from '../utils/leaderboardUtils/getMatchesFromEachTeam';

type FilterTypes = {
  filterByHome: boolean,
  filterByAway: boolean,
};

const getLeaderboard = async ({ filterByHome, filterByAway }:FilterTypes) => {
  const teams = await Clubs.findAll();

  if (!teams.length) {
    return responseGenerator(StatusCodes.NotFound, 'Clubs not found!');
  }

  const leaderBoardInfo = await getMatchesFromEachTeam(
    teams,
    filterByHome,
    filterByAway,
  );

  return responseGenerator(StatusCodes.OK, '', leaderBoardInfo);
};

export default getLeaderboard;
