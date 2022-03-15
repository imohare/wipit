import Sequelize from '@sequelize/core';
import sequelize from './config';
import Login from './userLogin';
import Profile from './userProfile';
import WipCollections from './wipcollections';
import Wips from './wips';
import Followers from './followers';

Login.belongsTo(Profile, {foreignKey: 'profileId'});
Profile.hasOne(Login, {foreignKey: 'profileId'});
WipCollections.belongsTo(Profile, {foreignKey: 'profileId'});
Profile.hasMany(WipCollections, {foreignKey: 'profileId'});
Wips.belongsTo(WipCollections, {foreignKey: 'wipId'});
WipCollections.hasMany(Wips, {foreignKey: 'wipId'});
Profile.hasOne(Followers, {foreignKey: 'profileId'});
Followers.belongsTo(Profile, {foreignKey: 'userId'});
Followers.belongsTo(Profile, {foreignKey: 'followerId'});

const db = {
  'Login': Login,
  'Profile': Profile,
  'WipCollections': WipCollections,
  'Wips': Wips,
  'Followers': Followers,
  Sequelize: Sequelize,
  sequelize: sequelize,
};

export default db;
