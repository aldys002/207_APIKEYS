const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "backend_api",      // DB_NAME
  "root",             // DB_USER
  "Cokiber_2893",     // DB_PASS
  {
    host: "localhost",
    port: 3307,        // DB_PORT
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
