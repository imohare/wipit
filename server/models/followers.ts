import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface FollowersInterface {
  followId: string;
  userId: string;
  followerId: string;
}

class Followers extends Model<FollowersInterface> implements FollowersInterface {
  public followId!: string;
  public userId!: string;
  public followerId!: string;
}

Followers.init({
    followId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID
    },
    followerId: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true
  }
);

export default Followers;
