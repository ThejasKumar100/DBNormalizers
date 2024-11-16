import { useState, useEffect } from 'react';

export default function FlightDetails() {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({ flightNumber: '', departureTime: '', arrivalTime: '', destination: '' });

  useEffect(() => {
    const fetchFlightDetails = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/flight-details?${query}`);
      const data = await response.json();
      setFlights(data);
    };

    fetchFlightDetails();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Flight Details</h1>
      <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} />
      <input name="departureTime" placeholder="Departure Time" onChange={handleChange} />
      <input name="arrivalTime" placeholder="Arrival Time" onChange={handleChange} />
      <input name="destination" placeholder="Destination" onChange={handleChange} />
      <ul>
        {flights.map((flight) => (
          <li key={flight.FlightNumber}>{flight.FlightNumber} - {flight.Destination}</li>
        ))}
      </ul>
    </div>
  );
}
