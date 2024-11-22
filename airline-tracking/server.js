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

app.post('/update-tickets-vulnerable', (req, res) => {
  const { flightCode, passengerLastName, newSeatingNumber } = req.body;

  let sql = `UPDATE TicketInfo SET SeatingNumber = '${newSeatingNumber}' WHERE FlightCode = '${flightCode}' AND PassengerLastName = '${passengerLastName}'`;
// ' OR '1'='1' OR PassengerLastName='Davis'; UPDATE TicketInfo SET PassengerLastName='HACKED', FlightCode='AAL9999' WHERE PassengerLastName='Davis'; --
  console.log('Executing SQL Query:', sql);

  pool.query(sql, (error, results) => {
      if (error) {
          console.error('Error updating ticket:', error);
          return res.status(500).json({ success: false, message: 'Database query failed' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'No matching records found to update.' });
      }

      res.json({ success: true, message: 'Ticket updated successfully.' });
  });
});


