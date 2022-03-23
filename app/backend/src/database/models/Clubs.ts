import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Clubs extends Model {
  public id:number;

  public clubName:string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'clubs',
  timestamps: false,
});

Clubs.hasMany(Matches, { foreignKey: 'id', as: 'home_team' });
Clubs.hasMany(Matches, { foreignKey: 'id', as: 'away_team' });

Matches.belongsTo(Clubs, { foreignKey: 'id', as: 'home_team' });
Matches.belongsTo(Clubs, { foreignKey: 'id', as: 'away_team' });

export default Clubs;
