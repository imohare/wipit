import Sequelize from '@sequelize/core';
import sequelize from './config';
import userLogin from './userLogin';
import userProfile from './userProfile';
import Wips from './wips';
import Cards from './cards';
/*
userLogin.hasOne(userProfile, {
  foreignKey: 'userId', sourceKey: 'profileId'
});

userProfile.belongsTo(userLogin, {
  foreignKey: 'userId', targetKey: 'profileId'
});
userProfile.hasMany(Wips, {
  foreignKey: 'wipId'
});
userProfile.hasMany(Cards, {
  foreignKey: 'cardId'
});

Wips.belongsTo(userProfile);
Wips.hasMany(Cards, {
  foreignKey: 'wipId'
});

Cards.belongsTo(Wips, {
  foreignKey: 'wipId'
});
Cards.hasOne(userProfile);*/

const db = {
  'UserLogin': userLogin,
  'UserProfile': userProfile,
  'Wips': Wips,
  'Cards': Cards,
  Sequelize: Sequelize,
  sequelize: sequelize,
};

export default db;
