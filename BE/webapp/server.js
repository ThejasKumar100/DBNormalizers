const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set up the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware to parse JSON requests
app.use(express.json());

// Route for `FlightDetails` table with optional queries
app.get('/api/flight-details', (req, res) => {
    const { flightNumber, departureTime, arrivalTime, destination } = req.query;
    let query = 'SELECT * FROM FlightDetails WHERE 1=1';
    const params = [];
  
    if (flightNumber) {
      query += ' AND FlightNumber = ?';
      params.push(flightNumber);
    }
    if (departureTime) {
      query += ' AND DepartureTime = ?';
      params.push(departureTime);
    }
    if (arrivalTime) {
      query += ' AND ArrivalTime = ?';
      params.push(arrivalTime);
    }
    if (destination) {
      query += ' AND Destination = ?';
      params.push(destination);
    }
  
    pool.query(query, params, (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(results);
    });
  });
  
  // Route for `Luggage` table with optional queries
  app.get('/api/luggage', (req, res) => {
    const { luggageID, passengerID, weight } = req.query;
    let query = 'SELECT * FROM Luggage WHERE 1=1';
    const params = [];
  
    if (luggageID) {
      query += ' AND LuggageID = ?';
      params.push(luggageID);
    }
    if (passengerID) {
      query += ' AND PassengerID = ?';
      params.push(passengerID);
    }
    if (weight) {
      query += ' AND Weight = ?';
      params.push(weight);
    }
  
    pool.query(query, params, (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(results);
    });
  });
  
  // Route for `TicketInfo` table with optional queries
  app.get('/api/ticket-info', (req, res) => {
    const { ticketID, passengerName, flightNumber, seatNumber } = req.query;
    let query = 'SELECT * FROM TicketInfo WHERE 1=1';
    const params = [];
  
    if (ticketID) {
      query += ' AND TicketID = ?';
      params.push(ticketID);
    }
    if (passengerName) {
      query += ' AND PassengerName = ?';
      params.push(passengerName);
    }
    if (flightNumber) {
      query += ' AND FlightNumber = ?';
      params.push(flightNumber);
    }
    if (seatNumber) {
      query += ' AND SeatNumber = ?';
      params.push(seatNumber);
    }
  
    pool.query(query, params, (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(results);
    });
  });

  // Connection to the database

  const connection = mysql.createConnection({
    host: 'airlinetracking.cruswaem2d1y.us-east-2.rds.amazonaws.com',
    user: 'airlineTracking',
    password: 'DBNormalizers',
    database: 'airlineTracking',
    port: 3306
  });
  
  connection.connect();

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  // Query to get data from AirportDetails
  connection.query('SELECT * FROM AirportDetails', (error, results) => {
    if (error) throw error;
    console.log(results);
  });
  
  connection.end();