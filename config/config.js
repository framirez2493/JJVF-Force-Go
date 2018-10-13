module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DBPASSWORD,
    "database": "passport_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.JAWSDB_USER,
    "password": process.env.JAWSDB_PASSWORD,
    "database": process.env.JAWSDB_DATABASE,
    "host": process.env.JAWSDB_HOST,
    "dialect": "mysql"
  }
}


