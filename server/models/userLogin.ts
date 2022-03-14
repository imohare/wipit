import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface userLoginInterface {
  uid: string;
  email: string;
  password: string;
}

class userLogin extends Model<userLoginInterface> implements userLoginInterface {
  public uid!: string;
  public email!: string;
  public password!: string;
}

userLogin.init({
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
