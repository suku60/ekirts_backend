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
    "username": "bj3ses19tupwslgo",
    "password": "hyjcfcuzmf5z54w4",
    "database": "x1fidtjdv3dvjf5m",
    "host": "cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}