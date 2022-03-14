import Sequelize from '@sequelize/core';
import sequelize from './config';
import userLogin from './userLogin';
import userProfile from './userProfile';
import Wips from './wips';
import Cards from './cards';

const db = {
  'UserLogin': userLogin,
  'UserProfile': userProfile,
  'Wips': Wips,
  'Cards': Cards,
  Sequelize: Sequelize,
  sequelize: sequelize,
};

export default db;
