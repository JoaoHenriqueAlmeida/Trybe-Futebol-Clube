import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  public id:number;

  public homeTeam:number;

  public homeTeamGoals:number;

  public awayTeam:number;

  public awayTeamGoals:number;

  public inProgress:number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Matches;
