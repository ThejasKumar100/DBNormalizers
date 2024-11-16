import { useState, useEffect } from 'react';

export default function AirportDetails() {
  const [airports, setAirports] = useState([]);
  const [filters, setFilters] = useState({ airportCode: '', cityLocation: '', timezone: '' });

  useEffect(() => {
    const fetchAirportDetails = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/airport-details?${query}`);
      const data = await response.json();
      setAirports(data);
    };

    fetchAirportDetails();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Airport Details</h1>
      <input name="airportCode" placeholder="Airport Code" onChange={handleChange} />
      <input name="cityLocation" placeholder="City Location" onChange={handleChange} />
      <input name="timezone" placeholder="Timezone" onChange={handleChange} />
      <ul>
        {airports.map((airport) => (
          <li key={airport.AirportCode}>{airport.AirportName} - {airport.CityLocation}</li>
        ))}
      </ul>
    </div>
  );
}
