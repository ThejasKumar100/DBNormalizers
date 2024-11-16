const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


  app.get('/tickets', (req, res) => {
    pool.query('SELECT * FROM TicketInfo', (error, results) => {
      if (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Database query failed' });
      } else {
        res.json(results);
      }
    });
  });
  
// New route to handle adding a ticket
app.post('/tickets', (req, res) => {
  // Extract data from the request body
  const { flightCode, seatingNumber, passengerFirstName, passengerLastName, groupNumber } = req.body;

  // Validate input data
  if (!flightCode || !seatingNumber || !passengerFirstName || !passengerLastName || !groupNumber) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Additional validation (e.g., data formats) can be added here

  // Generate UUIDs for OwnerID and ConfirmationNumber
  const ownerID = generateUUID();
  const confirmationNumber = generateUUID();

  // Prepare the SQL query using parameterized queries
  const sql = `
    INSERT INTO TicketInfo (
      FlightCode, SeatingNumber, PassengerFirstName, PassengerLastName, GroupNumber, OwnerID, ConfirmationNumber
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    flightCode,
    seatingNumber,
    passengerFirstName,
    passengerLastName,
    groupNumber,
    ownerID,
    confirmationNumber
  ];

  // Execute the query
  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting ticket:', error);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    res.json({ success: true, message: 'Ticket added successfully.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to generate a UUID
function generateUUID() {
  return require('crypto').randomUUID();
}