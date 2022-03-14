import {DataTypes, Model} from '@sequelize/core';
import sequelize from './config';

interface CardsInterface {
  id: string;
  image: string;
  uploadDate: Date;
}

class Cards extends Model<CardsInterface> implements CardsInterface {
  public id!: string;
  public image!: string;
  public uploadDate!: Date;
}

Cards.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: sequelize
  }
);

export default Cards;
