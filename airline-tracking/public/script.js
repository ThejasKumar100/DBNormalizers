document.getElementById('vulnerableSearchForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const flightCode = document.getElementById('flightCode').value;
    const passengerLastName = document.getElementById('passengerLastName').value;

    try {
        const response = await fetch('/search-tickets-vulnerable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flightCode, passengerLastName }),
        });

        const results = await response.json();

        const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
        resultsTable.innerHTML = ''; 

        results.forEach(ticket => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.FlightCode}</td>
                <td>${ticket.SeatingNumber}</td>
                <td>${ticket.PassengerFirstName}</td>
                <td>${ticket.PassengerLastName}</td>
                <td>${ticket.GroupNumber}</td>
            `;
            resultsTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});
