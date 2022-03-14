import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface UserProfileInterface {
  profileId: string;
  name: string;
  type: string;
}

class UserProfile extends Model<UserProfileInterface> implements UserProfileInterface {
  public profileId!: string;
  public name!: string;
  public type!: string;
}

UserProfile.init({
    profileId: {
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

export default UserProfile;
