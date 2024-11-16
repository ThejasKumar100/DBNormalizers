import { useState, useEffect } from 'react';

export default function TicketInfo() {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ ticketID: '', passengerName: '', flightNumber: '', seatNumber: '' });

  useEffect(() => {
    const fetchTicketInfo = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/ticket-info?${query}`);
      const data = await response.json();
      setTickets(data);
    };

    fetchTicketInfo();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Ticket Info</h1>
      <input name="ticketID" placeholder="Ticket ID" onChange={handleChange} />
      <input name="passengerName" placeholder="Passenger Name" onChange={handleChange} />
      <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} />
      <input name="seatNumber" placeholder="Seat Number" onChange={handleChange} />
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.TicketID}>Ticket ID: {ticket.TicketID}, Passenger: {ticket.PassengerName}</li>
        ))}
      </ul>
    </div>
  );
}
