import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';
import UserProfile from './userProfile';
import Cards from './cards';

interface WipsInterface {
  id: string;
  title: string;
  update_request: string | undefined;
  update_request_date: string | undefined;
}

class Wips extends Model<WipsInterface> implements WipsInterface {
  public id!: string;
  public title!: string;
  public update_request: string | undefined;
  public update_request_date: string | undefined;
}

Wips.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    update_request: {
      type:  DataTypes.STRING,
    },
    update_request_date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: sequelize
  }
);

//Wips.belongsTo(UserProfile);
Wips.hasMany(Cards);

export default Wips;
