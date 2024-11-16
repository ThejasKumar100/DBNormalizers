// public/script.js

// Function to fetch ticket data from the server
async function fetchTicketData() {
    try {
        const response = await fetch('/tickets');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayTicketData(data);
    } catch (error) {
        console.error('Error fetching ticket data:', error);
    }
}

// Function to display ticket data in the table
function displayTicketData(tickets) {
    const tableBody = document.querySelector('#ticketTable tbody');

    tickets.forEach(ticket => {
        const row = document.createElement('tr');

        // Flight Code
        const flightCodeCell = document.createElement('td');
        flightCodeCell.textContent = ticket.FlightCode;
        row.appendChild(flightCodeCell);

        // Seating Number
        const seatingNumberCell = document.createElement('td');
        seatingNumberCell.textContent = ticket.SeatingNumber;
        row.appendChild(seatingNumberCell);

        // Passenger First Name
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = ticket.PassengerFirstName;
        row.appendChild(firstNameCell);

        // Passenger Last Name
        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = ticket.PassengerLastName;
        row.appendChild(lastNameCell);

        // Group Number
        const groupNumberCell = document.createElement('td');
        groupNumberCell.textContent = ticket.GroupNumber;
        row.appendChild(groupNumberCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Call the function to fetch and display ticket data when the page loads
document.addEventListener('DOMContentLoaded', fetchTicketData);


// Function to handle form submission
document.getElementById('ticketForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const flightCode = document.getElementById('flightCode').value.trim();
    const seatingNumber = document.getElementById('seatingNumber').value.trim();
    const passengerFirstName = document.getElementById('passengerFirstName').value.trim();
    const passengerLastName = document.getElementById('passengerLastName').value.trim();
    const groupNumber = document.getElementById('groupNumber').value.trim();

    // Validate form data (you can add more validation as needed)
    if (!flightCode || !seatingNumber || !passengerFirstName || !passengerLastName || !groupNumber) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Send data to the backend
        const response = await fetch('/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                flightCode,
                seatingNumber,
                passengerFirstName,
                passengerLastName,
                groupNumber
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            // Optionally, clear the form
            document.getElementById('ticketForm').reset();

            // Refresh the ticket data
            fetchTicketData();
        } else {
            alert('Error adding ticket: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while adding the ticket.');
    }
});