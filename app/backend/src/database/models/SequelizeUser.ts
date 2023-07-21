import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeUser extends Model<
InferAttributes<SequelizeUser>,
InferCreationAttributes<SequelizeUser>
> {
  declare id: CreationOptional<number>;

  declare role: string;

  declare username: string;

  declare email: string;

  declare password: string;
}

SequelizeUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    modelName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default SequelizeUser;
