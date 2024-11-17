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

app.post('/search-tickets-secure', (req, res) => {
  const { flightCode, passengerLastName } = req.body;

  let sql = 'SELECT * FROM TicketInfo WHERE 1=1';
  const params = [];

  if (flightCode) {
    sql += ' AND FlightCode = ?';
    params.push(flightCode);
  }

  if (passengerLastName) {
    sql += ' AND PassengerLastName = ?';
    params.push(passengerLastName);
  }

  console.log('Executing Secure SQL Query:', sql);
  console.log('With Parameters:', params)

  pool.query(sql, params, (error, results) => {
    if (error) {
      console.error('Error executing secure query:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

