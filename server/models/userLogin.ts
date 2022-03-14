import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface userLoginInterface {
  uid: string;
  name: string;
  email: string;
  password: string;
}

class userLogin extends Model<userLoginInterface> implements userLoginInterface {
  public uid!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}

userLogin.init({
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize
  }
);

export default userLogin;
