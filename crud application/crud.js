// let data = [];
// let editIndex = -1;  // To keep track of which record is being edited

// function submitData() {
//     let name = document.getElementById('name').value;
//     let email = document.getElementById('email').value;
//     let phone = document.getElementById('phone').value;

//     if (editIndex === -1) {
//         // If not editing, add a new record
//         data.push({ name, email, phone });
//     } else {
//         // If editing, update the existing record
//         data[editIndex] = { name, email, phone };
//         editIndex = -1;  // Reset after editing
//     }

//     renderData();
//     clearInput();
// }

// function renderData() {
//     let tableDisplay = '';
//     data.forEach((users, index) => {
//         tableDisplay += ` <tr>
//                     <td>${index + 1}</td>
//                     <td>${users.name}</td>
//                     <td>${users.email}</td>
//                     <td>${users.phone}</td>
//                     <td>
//                         <span class="edit" onclick="editRecord(${index})">Edit</span>
//                         <span class="delete" onclick="deleteRecord(${index})">Delete</span>
//                     </td>
//                 </tr>`;
//     });
//     document.querySelector('.display').innerHTML = tableDisplay;
// }

// function clearInput() {
//     document.getElementById('name').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('phone').value = '';
// }

// // Edit the selected record
// function editRecord(index) {
//     let user = data[index];
//     document.getElementById('name').value = user.name;
//     document.getElementById('email').value = user.email;
//     document.getElementById('phone').value = user.phone;

//     editIndex = index;  // Set the index to know which record is being edited
// }

// // Delete the selected record
// function deleteRecord(index) {
//     data.splice(index, 1);  // Remove the selected user from the array
//     renderData();  // Re-render the table
// }






let records = JSON.parse(localStorage.getItem('records')) || [];
let isEditMode = false;
let editIndex = null;

document.getElementById('crudForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (isEditMode) {
        // Update the existing record
        records[editIndex] = { name, email, phone };
        isEditMode = false;
        editIndex = null;
    } else {
        // Add a new record
        records.push({ name, email, phone });
    }

    // Save records to localStorage
    localStorage.setItem('records', JSON.stringify(records));

    // Reset form and re-render table
    resetForm();
    renderTable();
});

// Function to render the table with records
function renderTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

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

// Function to edit a record
function editRecord(index) {
    const record = records[index];
    document.getElementById('name').value = record.name;
    document.getElementById('email').value = record.email;
    document.getElementById('phone').value = record.phone;

    isEditMode = true;
    editIndex = index;
}

// Function to delete a record
// Delete record
function confirmDelete(index) {
    // Show the custom delete confirmation modal
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex'; // Display modal
    deleteIndex = index; // Store the index of the record to delete
}

// Function to handle delete action after confirmation
document.getElementById('confirmDelete').addEventListener('click', function () {
    // If confirmed, delete the record
    records.splice(deleteIndex, 1); // Remove the record from the array
    localStorage.setItem('records', JSON.stringify(records)); // Update localStorage
    renderTable(); // Re-render the table after deletion

    // Close the modal
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
});

// Function to handle cancel delete action
document.getElementById('cancelDelete').addEventListener('click', function () {
    // Close the modal without deleting
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
});



// Function to reset the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    isEditMode = false;
    editIndex = null;
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', renderTable);

