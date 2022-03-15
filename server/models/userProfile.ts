import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface ProfileInterface {
  profileId: string;
  name: string;
  type: string;

}

class Profile extends Model<ProfileInterface> implements ProfileInterface {
  public profileId!: string;
  public name!: string;
  public type!: string;
}

Profile.init({
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
    freezeTableName: true
  }
);

export default Profile;
