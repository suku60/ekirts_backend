const config = require('./config/config');
const {
    Sequelize,
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || config.development.database,
    process.env.MYSQL_USER || config.development.username,
    process.env.MYSQL_PASSWORD || config.development.password, {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT || config.development.port || '3306',
        dialect: 'mysql',
        operatorAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
);

module.exports = sequelize.authenticate()
    .then((db) => {
        console.log(process.env.MYSQL_HOST)
        return db;
    });