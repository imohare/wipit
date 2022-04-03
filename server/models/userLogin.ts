import {DataTypes, HasOne, Model} from '@sequelize/core';
import sequelize from './config';

interface LoginInterface {
  loginId: string;
  email: string;
  password: string;
  profileId: string;
}

class Login extends Model<LoginInterface> implements LoginInterface {
  public loginId!: string;
  public email!: string;
  public password!: string;
  public profileId!: string;
}

Login.init({
    loginId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileId: {
      type: DataTypes.UUID,
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true
  }
);

export default Login;
