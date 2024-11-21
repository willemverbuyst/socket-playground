const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "garplydb",
  database: "garplyDB",
  password: "password",
  port: 5432,
});

pool.query("DROP TABLE IF EXISTS data");

pool
  .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  .catch((err) => console.error("Error enabling uuid-ossp extension:", err));

pool
  .query(
    `
    CREATE TABLE IF NOT EXISTS data (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        fuga TEXT,
        foo TEXT,
        bar INTEGER
    )
`
  )
  .catch((err) => console.error("Error creating table", err));

module.exports = pool;
