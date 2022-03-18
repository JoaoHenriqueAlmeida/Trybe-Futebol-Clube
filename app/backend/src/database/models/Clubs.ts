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

Clubs.hasMany(Matches, { foreignKey: 'id', as: 'matchs' });

export default Clubs;
