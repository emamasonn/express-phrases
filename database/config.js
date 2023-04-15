const { Client } = require("pg");

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const dbConnection = async () => {
  client.connect((err) => {
    if (err) {
      console.error("error connecting", err.stack);
    } else {
      console.log("DB connected");
    }
  });
};

module.exports = {
  dbConnection,
  query: (text, params) => client.query(text, params),
};
