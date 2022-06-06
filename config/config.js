require('dotenv').config();

module.exports = {
  "development": {
    "username": "bc7aa68a4e7763",
    "password": "f718d98a",
    "database": "heroku_d068fb2e88afa60",
    "host": "us-cdbr-east-05.cleardb.net",
    "dialect": "mysql"
  },
  "test": {
    "username": "admin_test",
    "password": "1234",
    "database": "ekirts_backend_test",
    "host": "us-cdbr-east-05.cleardb.net",
    "dialect": "mysql"
  },
  "production": {
    "username": "bc7aa68a4e7763",
    "password": "f718d98a",
    "database": "heroku_d068fb2e88afa60",
    "host": "us-cdbr-east-05.cleardb.net",
    "dialect": "mysql"
  }
}
