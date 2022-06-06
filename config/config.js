require('dotenv').config();

module.exports = {
  "development": {
    "username": "bc7aa68a4e7763",
    "password": "f718d98a",
    "database": "ekirts_backend_production",
    "host": "us-cdbr-east-05.cleardb.net",
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
    "username": "bc7aa68a4e7763",
    "password": "f718d98a",
    "database": "ekirts_backend_production",
    "host": "us-cdbr-east-05.cleardb.net",
    "dialect": "mysql"
  }
}