// public/script.js

// =========================
// Utility Functions
// =========================

// Function to fetch ticket data from the server
async function fetchTicketData(searchTerm = '') {
    try {
        searchTerm = String(searchTerm || ''); // Ensure searchTerm is always a string
        const response = await fetch('/tickets');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayTicketData(data, searchTerm);
    } catch (error) {
        console.error('Error fetching ticket data:', error);
    }
}

// Function to display ticket data in the table
function displayTicketData(tickets, searchTerm = '') {
    const tableBody = document.querySelector('#ticketTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    const filteredTickets = tickets.filter(ticket => {
        const fullName = `${ticket.PassengerFirstName} ${ticket.PassengerLastName}`.toLowerCase();
        return (
            ticket.FlightCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.SeatingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fullName.includes(searchTerm.toLowerCase()) ||
            ticket.GroupNumber.toString().includes(searchTerm)
        );
    });

    filteredTickets.forEach(ticket => {
        const row = document.createElement('tr');

        // Populate row cells
        ['FlightCode', 'SeatingNumber', 'PassengerFirstName', 'PassengerLastName', 'GroupNumber'].forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = ticket[field];
            row.appendChild(cell);
        });

        // Action Buttons
        const actionCell = document.createElement('td');

        // Delete Button
        const deleteButton = createButton('Delete', ['btn', 'btn-sm', 'btn-danger', 'delete-button', 'action-button'], () => deleteTicket(ticket.OwnerID));
        actionCell.appendChild(deleteButton);

        // Edit Button
        const editButton = createButton('Edit', ['btn', 'btn-sm', 'btn-primary', 'edit-button', 'action-button'], () => openEditModal(ticket));
        actionCell.appendChild(editButton);

        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

// Helper function to create a button with event listeners
function createButton(text, classList, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(...classList);
    button.addEventListener('click', onClick);
    return button;
}

// =========================
// Ticket Actions
// =========================

// Function to handle ticket deletion
async function deleteTicket(ownerID) {
    try {
        const response = await fetch(`/tickets/${ownerID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        const result = await response.json();
        if (result.success) {
            showToast('Ticket deleted successfully.', 'success');
            fetchTicketData();
        } else {
            showToast('Error deleting ticket: ' + result.message, 'danger');
        }
    } catch (error) {
        console.error('Error deleting ticket:', error);
        alert('An error occurred while deleting the ticket.');
    }
}

// Function to open the edit modal with ticket data
function openEditModal(ticket) {
    currentEditingTicket = ticket;

    // Populate form fields
    document.getElementById('editFlightCode').value = ticket.FlightCode;
    document.getElementById('editSeatingNumber').value = ticket.SeatingNumber;
    document.getElementById('editPassengerFirstName').value = ticket.PassengerFirstName;
    document.getElementById('editPassengerLastName').value = ticket.PassengerLastName;
    document.getElementById('editGroupNumber').value = ticket.GroupNumber;

    $('#editModal').modal('show'); // Show modal
}

// Function to close the edit modal
function closeEditModal() {
    $('#editModal').modal('hide');
}

// =========================
// Event Listeners
// =========================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchTicketData(); // Load all tickets initially

    // Add event listener for form submission
    document.getElementById('ticketForm').addEventListener('submit', handleTicketFormSubmission);

    // Add event listener for edit form submission
    document.getElementById('editTicketForm').addEventListener('submit', handleEditFormSubmission);

    // Add event listener for search input
    document.getElementById('searchInput').addEventListener('input', event => {
        fetchTicketData(event.target.value || '');
    });
});

// Form submission for adding a new ticket
async function handleTicketFormSubmission(event) {
    event.preventDefault();
    const formData = collectFormData(['flightCode', 'seatingNumber', 'passengerFirstName', 'passengerLastName', 'groupNumber']);
    if (!formData) return;

    try {
        const response = await fetch('/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        const result = await response.json();

        if (result.success) {
            document.getElementById('ticketForm').reset();
            fetchTicketData();
        } else {
            alert('Error adding ticket: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while adding the ticket.');
    }
}

// Form submission for editing a ticket
async function handleEditFormSubmission(event) {
    event.preventDefault();
    if (!currentEditingTicket) {
        alert('No ticket selected for editing.');
        return;
    }

    const formData = collectFormData(['editFlightCode', 'editSeatingNumber', 'editPassengerFirstName', 'editPassengerLastName', 'editGroupNumber']);
    if (!formData) return;

    try {
        const response = await fetch(`/tickets/${currentEditingTicket.OwnerID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        const result = await response.json();

        if (result.success) {
            closeEditModal();
            fetchTicketData();
            alert('Ticket updated successfully.');
        } else {
            alert('Error updating ticket: ' + result.message);
        }
    } catch (error) {
        console.error('Error updating ticket:', error);
        alert('An error occurred while updating the ticket.');
    }
}

// =========================
// Helpers
// =========================

// Collect form data by field IDs
function collectFormData(fieldIds) {
    const formData = {};
    for (const id of fieldIds) {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            alert('Please fill in all fields.');
            return null;
        }
        formData[id.replace('edit', '').replace(/^\w/, c => c.toLowerCase())] = value;
    }
    return formData;
}

// Show toast notifications
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.role = 'alert';
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
        </div>`;
    toastContainer.appendChild(toast);
    $(toast).toast({ delay: 3000 });
    $(toast).toast('show');
    $(toast).on('hidden.bs.toast', () => toast.remove());
}
