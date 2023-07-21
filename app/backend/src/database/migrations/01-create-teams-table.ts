import { DataTypes, Model, QueryInterface } from 'sequelize';
import { ITeam } from '../../Interfaces/teams/ITeam';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },
  
  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
