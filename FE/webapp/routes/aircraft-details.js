import { useState, useEffect } from 'react';

export default function AircraftDetails() {
  const [aircraft, setAircraft] = useState([]);
  const [filters, setFilters] = useState({ tailNumber: '', manufacturer: '', yearOfCreation: '' });

  useEffect(() => {
    const fetchAircraftDetails = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/aircraft-details?${query}`);
      const data = await response.json();
      setAircraft(data);
    };

    fetchAircraftDetails();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Aircraft Details</h1>
      <input name="tailNumber" placeholder="Tail Number" onChange={handleChange} />
      <input name="manufacturer" placeholder="Manufacturer" onChange={handleChange} />
      <input name="yearOfCreation" placeholder="Year of Creation" onChange={handleChange} />
      <ul>
        {aircraft.map((item) => (
          <li key={item.id}>{item.model} - {item.manufacturer}</li>
        ))}
      </ul>
    </div>
  );
}
