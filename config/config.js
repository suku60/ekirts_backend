require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": "1234",
    "database": "ekirts_backend",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "admin_test",
    "password": "1234",
    "database": "ekirts_backend_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin_production",
    "password": "1234",
    "database": "ekirts_backend_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}