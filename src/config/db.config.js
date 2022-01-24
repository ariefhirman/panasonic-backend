const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  // HOST: "localhost",
  // PORT: 27017,
  // DB: "psg-warehouse"
  HOST: DB_HOST,
  PORT: DB_PORT,
  DB: DB_NAME
};