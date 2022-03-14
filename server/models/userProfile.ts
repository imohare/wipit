import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';
import Wips from './wips';

interface UserProfileInterface {
  uid: string;
  name: string;
  type: string;
}

class UserProfile extends Model<UserProfileInterface> implements UserProfileInterface {
  public uid!: string;
  public name!: string;
  public type!: string;
}

UserProfile.init({
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
  }
);

UserProfile.hasMany(Wips);

export default UserProfile;
