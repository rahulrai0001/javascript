// Load records from localStorage
let records = JSON.parse(localStorage.getItem('records')) || [];
let isEditMode = false;
let editIndex = null;
let isDeleteConfirmed = false;
let deleteIndex = null;


function renderRecordsTable() {
    const tableBody = document.querySelector('.display2');
    tableBody.innerHTML = '';

    records.forEach((record, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td>${record.phone}</td>
                <td>
                    <span class="edit" onclick="editRecord(${index})">Edit</span>
                    <span class="delete" onclick="confirmDelete(${index})">Delete</span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Open modal for editing record
function editRecord(index) {
    const record = records[index];
    document.getElementById('name').value = record.name;
    document.getElementById('email').value = record.email;
    document.getElementById('phone').value = record.phone;

    isEditMode = true;
    editIndex = index;
    showModal();
}

// Save or update record
document.getElementById('crudForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (isEditMode) {
        // Update record
        records[editIndex] = { name, email, phone };
        isEditMode = false;
        editIndex = null;
    } else {
        // Add new record
        records.push({ name, email, phone });
    }

    localStorage.setItem('records', JSON.stringify(records));
    hideModal();
    renderRecordsTable();
});

// Show and hide modal functions
const modalOverlay = document.getElementById('modalOverlay');
const closeButton = document.getElementById('closeButton');

function showModal() {
    modalOverlay.style.display = 'flex';
}

function hideModal() {
    modalOverlay.style.display = 'none';
    document.getElementById('crudForm').reset();
}

closeButton.addEventListener('click', hideModal);
window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
});

// Delete record
function confirmDelete(index) {
    // Show the custom delete confirmation modal
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex'; // Display modal
    deleteIndex = index; // Store the index of the record to delete
}

// Function to handle delete action after confirmation
document.getElementById('confirmDelete').addEventListener('click', function() {
    // If confirmed, delete the record
    records.splice(deleteIndex, 1); // Remove the record from the array
    localStorage.setItem('records', JSON.stringify(records)); // Update localStorage
    renderRecordsTable(); // Re-render the table after deletion
    
    // Close the modal
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
});

// Function to handle cancel delete action
document.getElementById('cancelDelete').addEventListener('click', function() {
    // Close the modal without deleting
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
});


// Initialize table on page load
document.addEventListener('DOMContentLoaded', renderRecordsTable);
