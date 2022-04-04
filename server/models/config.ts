import { Dialect, Sequelize } from "@sequelize/core";
require("dotenv").config({ path: `${__dirname}/../../.env` });

const DATABASE = process.env.LEGACYDATABASE as string;
const USER = process.env.USER as string;
const PASSWORD = process.env.PASSWORD as string;

const dbConfig = {
  host: "localhost",
  dialect: "postgres" as Dialect,
  port: 5433,
  logging: false,
};

const sequelize = new Sequelize(
  "legacy",
  "savannahmanning1",
  "Rascals94!",
  dbConfig
);

export default sequelize;
