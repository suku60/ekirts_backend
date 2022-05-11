require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": "1234",
    "database": "videoclub_2022",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "admin_test",
    "password": "1234",
    "database": "videoclub_2022_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin_production",
    "password": "1234",
    "database": "videoclub_2022_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}