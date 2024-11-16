import { useState, useEffect } from 'react';

export default function Luggage() {
  const [luggage, setLuggage] = useState([]);
  const [filters, setFilters] = useState({ luggageID: '', passengerID: '', weight: '' });

  useEffect(() => {
    const fetchLuggage = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/luggage?${query}`);
      const data = await response.json();
      setLuggage(data);
    };

    fetchLuggage();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Luggage</h1>
      <input name="luggageID" placeholder="Luggage ID" onChange={handleChange} />
      <input name="passengerID" placeholder="Passenger ID" onChange={handleChange} />
      <input name="weight" placeholder="Weight" onChange={handleChange} />
      <ul>
        {luggage.map((item) => (
          <li key={item.LuggageID}>ID: {item.LuggageID}, Weight: {item.Weight}</li>
        ))}
      </ul>
    </div>
  );
}
