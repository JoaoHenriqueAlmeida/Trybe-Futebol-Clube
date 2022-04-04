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
  let points = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsInFavor = 0;
  let goalsTaken = 0;
  let goalsBalance = 0;
  let games = 0;

  matchesCurrTeam.forEach((match:Matchs) => {
    if (filterByHome && match.homeTeam === id) {
      games += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        points += 3;
        wins += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      } else {
        draws += 1;
        points += 1;
      }
      goalsInFavor += match.homeTeamGoals;
      goalsTaken += match.awayTeamGoals;
      goalsBalance = goalsInFavor - goalsTaken;
    }
    if (filterByAway && match.awayTeam === id) {
      games += 1;
      if (match.awayTeamGoals > match.homeTeamGoals) {
        points += 3;
        wins += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        losses += 1;
      } else {
        draws += 1;
        points += 1;
      }
      goalsInFavor += match.awayTeamGoals;
      goalsTaken += match.homeTeamGoals;
      goalsBalance = goalsInFavor - goalsTaken;
    }
  });
  const teamEfficiency = ((points / (games * 3)) * 100).toFixed(2);
  return {
    teamName,
    points,
    wins,
    draws,
    losses,
    goalsInFavor,
    goalsTaken,
    goalsBalance,
    games,
    efficiency: Number(teamEfficiency),
  };
};

export default getLeaderboardInfo;
