const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/tickets", (req, res) => {
  pool.query("SELECT * FROM TicketInfo", (error, results) => {
    if (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

// Protected route using prepared statements
app.post("/search-tickets-secure", (req, res) => {
  const { flightCode, passengerLastName } = req.body;

  // Initialize parts of the SQL query
  let sql = "SELECT * FROM TicketInfo";
  const conditions = [];
  const values = [];

  // Add conditions dynamically with parameterized values
  if (flightCode) {
    conditions.push("FlightCode LIKE ?");
    values.push(`${flightCode}%`); // Using wildcards for partial matching
  }
  if (passengerLastName) {
    conditions.push("PassengerLastName LIKE ?");
    values.push(`${passengerLastName}%`);
  }

  // Append conditions to the SQL query if there are any
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  console.log("Executing SQL Query:", sql, values); // Log query and values for debugging

  // Execute the parameterized query
  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Database error.");
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running on port ${port}, link: http://localhost:3000/index.html`
  );
});
