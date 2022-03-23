'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, 
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs', 
          key: 'id',
        },
        field: 'home_team',
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        },
        field: 'away_team',
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.INTEGER,
        field: 'in_progress',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('matchs')
  }
};
