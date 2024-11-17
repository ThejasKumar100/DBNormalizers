document.getElementById('vulnerableSearchForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect user input
    const flightCode = document.getElementById('flightCode').value;
    const passengerLastName = document.getElementById('passengerLastName').value;

    try {
        // Send the data to the vulnerable backend route
        const response = await fetch('/search-tickets-vulnerable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flightCode, passengerLastName }), // Send user inputs as JSON
        });

        // Parse the response JSON
        const results = await response.json();

        // Update the results table with the search results
        const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
        resultsTable.innerHTML = ''; // Clear previous results

        // Populate table rows with fetched data
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
