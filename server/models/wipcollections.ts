import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface WipCollectionsInterface {
  wipCollectionsId: string;
  wipCollectionTitle: string;
  profileId: string;
}

class WipCollections extends Model<WipCollectionsInterface> implements WipCollectionsInterface {
  public wipCollectionsId!: string;
  public wipCollectionTitle!: string;
  public profileId!: string;
}

WipCollections.init({
    wipCollectionsId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    wipCollectionTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileId: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true
  }
);

export default WipCollections;
