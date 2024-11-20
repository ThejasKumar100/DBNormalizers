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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}, link: http://localhost:3000/index.html`);
});

app.post('/search-tickets-vulnerable', (req, res) => {
  const { flightCode, passengerLastName } = req.body;

  // Vulnerable SQL Query
  let sql = 'SELECT * FROM TicketInfo WHERE ';
  if (flightCode) sql += `FlightCode = '${flightCode}'`;
  if (passengerLastName) sql += ` AND PassengerLastName = '${passengerLastName}'`;

  console.log('Executing SQL Query:', sql); // Log query to demonstrate SQL injection

  pool.query(sql, (error, results) => {
      if (error) {
          console.error('Error executing query:', error);
          return res.status(500).send('Database error.');
      }
      res.json(results);
  });
});

