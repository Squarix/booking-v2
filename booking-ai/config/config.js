module.exports = {
  "development": {
    "username": "admin",
    "password": "admin",
    "database": "booking-api",
    "host": process.env.DB_HOST || "localhost",
    "port": Number.parseInt(process.env.DB_PORT) || 5433,
    "dialect": "postgres"
  },
  "test": {
    "username": "admin",
    "password": "admin",
    "database": "booking-api",
    "host": process.env.DB_HOST || "localhost",
    "port": Number.parseInt(process.env.DB_PORT) || 5433,
    "dialect": "postgres"
  },
  "production": {
    "username": "admin",
    "password": "admin",
    "database": "booking-api",
    "host": process.env.DB_HOST || "localhost",
    "port": Number.parseInt(process.env.DB_PORT) || 5433,
    "dialect": "postgres"
  }
}
