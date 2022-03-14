import {Dialect, Sequelize} from '@sequelize/core';

const DATABASE = process.env.LEGACYDATABASE as string;
const USER = process.env.USER as string;
const PASSWORD = process.env.PASSWORD as string;

const dbConfig = {
  host: 'localhost',
  dialect: 'postgres' as Dialect,
  logging: false
}

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, dbConfig);

export default sequelize;
