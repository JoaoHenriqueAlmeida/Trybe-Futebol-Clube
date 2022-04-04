/* eslint-disable max-lines-per-function */
import Matchs from '../../database/models/Matchs';
import ILeaderBoardInfo from '../../interfaces/ILeaderboardInfo';

interface IParams {
  id:number,
  teamName:string,
  matchesCurrTeam:Array<Matchs>,
  filterByHome:boolean,
  filterByAway:boolean,
}

const getLeaderboardInfo = (
  { id, teamName, matchesCurrTeam, filterByHome, filterByAway }:IParams,
):ILeaderBoardInfo => {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  let totalGames = 0;

  matchesCurrTeam.forEach((match:Matchs) => {
    if (filterByHome && match.homeTeam === id) {
      totalGames += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
        totalPoints += 1;
      }
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
      goalsBalance = goalsFavor - goalsOwn;
    }
    if (filterByAway && match.awayTeam === id) {
      totalGames += 1;
      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
        totalPoints += 1;
      }
      goalsFavor += match.awayTeamGoals;
      goalsOwn += match.homeTeamGoals;
      goalsBalance = goalsFavor - goalsOwn;
    }
  });
  const teamEfficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return {
    teamName,
    totalPoints,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    totalGames,
    efficiency: Number(teamEfficiency),
  };
};

export default getLeaderboardInfo;
