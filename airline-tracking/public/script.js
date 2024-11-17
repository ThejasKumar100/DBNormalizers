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

    // Clear existing rows to avoid duplicates
    tableBody.innerHTML = '';

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

        // **Action Buttons Cell**
        const actionCell = document.createElement('td');

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'action-button','delete-button');
        deleteButton.addEventListener('click', () => deleteTicket(ticket.OwnerID));
        actionCell.appendChild(deleteButton);

        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'action-button', 'edit-button');
        editButton.addEventListener('click', () => openEditModal(ticket));
        actionCell.appendChild(editButton);

        // Append the action cell to the row
        row.appendChild(actionCell);

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

async function deleteTicket(ownerID) {
    try {
        const response = await fetch(`/tickets/${ownerID}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            alert('Ticket deleted successfully.');
            fetchTicketData(); // Refresh the table after deletion
        } else {
            alert('Error deleting ticket: ' + result.message);
        }
    } catch (error) {
        console.error('Error deleting ticket:', error);
        alert('An error occurred while deleting the ticket.');
    }
}

let currentEditingTicket = null;

function openEditModal(ticket) {
    currentEditingTicket = ticket; // Store the ticket being edited

    // Populate the form with existing data
    document.getElementById('editFlightCode').value = ticket.FlightCode;
    document.getElementById('editSeatingNumber').value = ticket.SeatingNumber;
    document.getElementById('editPassengerFirstName').value = ticket.PassengerFirstName;
    document.getElementById('editPassengerLastName').value = ticket.PassengerLastName;
    document.getElementById('editGroupNumber').value = ticket.GroupNumber;

    // Show the modal using Bootstrap's modal function
    $('#editModal').modal('show');
}

function closeEditModal() {
    // Hide the modal
    $('#editModal').modal('hide');
}



// Close modal when clicking outside of the modal content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editTicketForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        if (!currentEditingTicket) {
            alert('No ticket selected for editing.');
            return;
        }

        // Collect updated data from the form
        const flightCode = document.getElementById('editFlightCode').value.trim();
        const seatingNumber = document.getElementById('editSeatingNumber').value.trim();
        const passengerFirstName = document.getElementById('editPassengerFirstName').value.trim();
        const passengerLastName = document.getElementById('editPassengerLastName').value.trim();
        const groupNumber = document.getElementById('editGroupNumber').value.trim();

        // Validate form data
        if (!flightCode || !seatingNumber || !passengerFirstName || !passengerLastName || !groupNumber) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Send updated data to the backend
            const response = await fetch(`/tickets/${currentEditingTicket.OwnerID}`, {
                method: 'PUT',
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
                // Close the modal
                closeEditModal();

                // Refresh the ticket data
                fetchTicketData();

                alert('Ticket updated successfully.');
            } else {
                alert('Error updating ticket: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('An error occurred while updating the ticket.');
        }
    });
});