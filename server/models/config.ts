import {Dialect, Sequelize} from '@sequelize/core';
require('dotenv').config({path: `${__dirname}/../../.env`});

const DATABASE = process.env.LEGACYDATABASE as string;
const USER = process.env.USER as string;
const PASSWORD = process.env.PASSWORD as string;

console.log(DATABASE, USER, PASSWORD)

const dbConfig = {
  host: 'localhost',
  dialect: 'postgres' as Dialect,
  logging: false
}

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, dbConfig);

export default sequelize;
