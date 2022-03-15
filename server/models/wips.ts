import {DataTypes, Model, Sequelize} from '@sequelize/core';
import sequelize from './config';

interface WipsInterface {
  wipId: string;
  title: string;
  image: string;
  uploadDate: string;
  wipCollectionId: string;
}

class Wips extends Model<WipsInterface> implements WipsInterface {
  public wipId!: string;
  public title!: string;
  public image!: string;
  public uploadDate!: string;
  public wipCollectionId!: string;
}

Wips.init({
    wipId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadDate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: Date.now().toString()
    },
    wipCollectionId: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true
  }
);

export default Wips;
