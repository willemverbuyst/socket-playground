const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "garplydb",
  database: "garply",
  password: "password",
  port: 5432,
});

const garplies = [
  { fuga: "FHV001", status: "Done", number: 250 },
  { fuga: "FHV002", status: "Active", number: 150 },
  { fuga: "FHV003", status: "Requested", number: 350 },
  { fuga: "FHV004", status: "Requested", number: 450 },
  { fuga: "FHV005", status: "Active", number: 550 },
];

pool.query("DROP TABLE IF EXISTS data");

// Create table and seed data
(async () => {
  try {
    // Enable uuid-ossp extension for UUID (if using UUIDs for id)
    await pool
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .catch((err) =>
        console.error("Error enabling uuid-ossp extension:", err)
      );

    // Create table if it doesn't exist
    await pool
      .query(
        `
            CREATE TABLE IF NOT EXISTS data (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                fuga TEXT NOT NULL,
                status TEXT NOT NULL,
                number INTEGER NOT NULL
            )
        `
      )
      .catch((err) => console.error("Error creating table", err));

    console.log("Table created or already exists");

    // Check if the table is already seeded
    const { rows } = await pool.query("SELECT COUNT(*) AS count FROM data");
    if (parseInt(rows[0].count, 10) === 0) {
      // Insert seed data
      const seedQuery = `
                INSERT INTO data (fuga, status, number)
                VALUES ($1, $2, $3)
            `;
      for (const item of garplies) {
        await pool.query(seedQuery, [item.fuga, item.status, item.number]);
      }
      console.log("Seed data inserted successfully");
    } else {
      console.log("Data already seeded, skipping");
    }
  } catch (err) {
    console.error("Error during database initialization:", err);
  } finally {
    console.log("Database set up is done");
  }
})();

module.exports = pool;
