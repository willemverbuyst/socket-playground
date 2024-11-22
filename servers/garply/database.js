const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "garplydb",
  database: "garply",
  password: "password",
  port: 5432,
});

const garplies = [
  { fuga: "FHV001", foo: "Done", bar: 250 },
  { fuga: "FHV002", foo: "Active", bar: 150 },
  { fuga: "FHV003", foo: "Requested", bar: 350 },
  { fuga: "FHV004", foo: "Requested", bar: 450 },
  { fuga: "FHV005", foo: "Active", bar: 550 },
];

(async () => {
  try {
    // Ensure table is dropped before proceeding
    await pool.query("DROP TABLE IF EXISTS data");
    console.log("Table dropped successfully");

    // Enable uuid-ossp extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log("UUID extension enabled");

    // Create table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS data (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          fuga TEXT NOT NULL,
          foo TEXT NOT NULL,
          bar INTEGER NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("Table created successfully");

    // Check if the table is already seeded
    const { rows } = await pool.query("SELECT COUNT(*) AS count FROM data");
    if (parseInt(rows[0].count, 10) === 0) {
      // Insert seed data
      const seedQuery = `
        INSERT INTO data (fuga, foo, bar)
        VALUES ($1, $2, $3)
      `;
      for (const item of garplies) {
        await pool.query(seedQuery, [item.fuga, item.foo, item.bar]);
      }
      console.log("Seed data inserted successfully");
    } else {
      console.log("Data already seeded, skipping");
    }
  } catch (err) {
    console.error("Error during database initialization:", err);
  } finally {
    console.log("Database setup is done");
  }
})();

module.exports = pool;
