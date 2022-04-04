import Matchs from '../../database/models/Matchs';
import getLeaderboardInfo from './getLeaderboarInfo';
import IClub from '../../interfaces/IClub';
import ILeaderboardInfo from '../../interfaces/ILeaderboardInfo';

const sortInfo = (info:ILeaderboardInfo[]) => info.sort(
  (teamA:ILeaderboardInfo, teamB:ILeaderboardInfo) =>
    teamB.points - teamA.points
    || teamB.goalsBalance - teamA.goalsBalance
    || teamB.goalsInFavor - teamA.goalsInFavor
    || teamA.goalsTaken - teamB.goalsTaken,
);

const getMatchesFromEachTeam = async (
  teams:Array<IClub>,
  filterByHome:boolean,
  filterByAway:boolean,
) => {
  const leaderboardInfo = await Promise.all(
    teams.map(async (currTeam) => {
      const matchesCurrTeam = await Matchs.findAll({ where: { inProgress: false } });
      return getLeaderboardInfo({
        id: currTeam.id,
        teamName: currTeam.clubName,
        matchesCurrTeam,
        filterByHome,
        filterByAway,
      });
    }),
  );

  return sortInfo(leaderboardInfo);
};

export default getMatchesFromEachTeam;
