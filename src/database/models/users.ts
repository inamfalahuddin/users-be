import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/db.connect";

interface UsersAttributes {
  id?: string;
  nama?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UsersInput extends Optional<UsersAttributes, "id"> {}
export interface UsersOutput extends Required<UsersAttributes> {}

class Users
  extends Model<UsersAttributes, UsersInput>
  implements UsersAttributes
{
  public id!: string;
  public nama!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    nama: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refreshToken: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    underscored: false,
  }
);

export default Users;
