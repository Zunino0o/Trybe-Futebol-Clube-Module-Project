import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class SequelzeTeam extends Model<InferAttributes<SequelzeTeam>, InferCreationAttributes<SequelzeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelzeTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  }
);
 export default SequelzeTeam;