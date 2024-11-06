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
                <td>${record.id || index + 1}</td>
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
document.getElementById('crudForm').addEventListener('submit', function (e) {
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
document.getElementById('confirmDelete').addEventListener('click', function () {
    // If confirmed, delete the record
    records.splice(deleteIndex, 1); // Remove the record from the array
    localStorage.setItem('records', JSON.stringify(records)); // Update localStorage
    renderRecordsTable(); // Re-render the table after deletion

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


// Initialize table on page load
document.addEventListener('DOMContentLoaded', renderRecordsTable);


// function searchfn(){
//     let filter= document.getElementById('searchBar').value.toUpperCase();

//     let myTable= document.getElementsByClassName('display2')[0];

//     let tr= myTable.getElementsByTagName('tr');

//     for(i=0; i<tr.length; i++){
//         let td= tr[i].getElementsByTagName('td')[1];
//         // console.log(tr);

//         if(td){
//             let textvalue=td.textContent || td.innerHTML;

//             if(textvalue.toUpperCase().indexOf(filter)>-1){
//                 tr[i].style.display = "";
//             }else{
//                 tr[i].style.display = "none";
//             }
//         }
//     }
    
// }





function searchfn() {
    // Step 1: Access the search bar input and retrieve its value in lowercase for a case-insensitive search.
    const input = document.getElementById("searchBar");
    const filter = input.value.toLowerCase();

    // Step 2: Select the table containing the rows.
    const table = document.querySelector("table");

    // Step 3: Get all rows (`tr` elements) within the table.
    const rows = table.getElementsByTagName("tr");

    // Step 4: Start looping from the second row (`i = 1`) to skip the header row.
    for (let i = 1; i < rows.length; i++) {
        // Step 5: Retrieve all the cells (`td` elements) of the current row.
        let cells = rows[i].getElementsByTagName("td");
        console.log(cells);
        
        // Step 6: Initialize `match` to `false`. It will track if the row matches the search term.
        let match = false;

        // Step 7: Loop through the cells of the current row, skipping the last cell (Actions).
        for (let j = 0; j < cells.length - 1; j++) {
            // Step 8: Check if the cell's text contains the search term (in lowercase for case insensitivity).
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                match = true; // A match is found
                break; // Stop searching in this row
            }
        }

        // Step 9: If a match is found, display the row; if not, hide the row.
        if (match) {
            rows[i].style.display = ""; // Show the row
        } else {
            rows[i].style.display = "none"; // Hide the row
        }
    }
}


// // Variable to keep track of current sort direction
// let currentSort = {
//     column: null,
//     ascending: true
// };

// function sortTable(column) {
//     // Toggle sort direction if sorting the same column; otherwise, set ascending to true
//     if (currentSort.column === column) {
//         currentSort.ascending = !currentSort.ascending;
//     } else {
//         currentSort.column = column;
//         currentSort.ascending = true;
//     }

//     // Sort the records based on the selected column and direction
//     records.sort((a, b) => {
//         let valueA = a[column];
//         let valueB = b[column];

//         // Handle sorting by ID as a number, other fields as strings
//         if (column === 'id') {
//             valueA = parseInt(valueA);
//             valueB = parseInt(valueB);
//         }

//         // Compare values for sorting
//         if (valueA < valueB) return currentSort.ascending ? -1 : 1;
//         if (valueA > valueB) return currentSort.ascending ? 1 : -1;
//         return 0;
//     });

//     // Re-render the sorted records
//     renderRecordsTable();
// }

// // Make sure to render the table on page load
// document.addEventListener('DOMContentLoaded', renderRecordsTable);

function sortTable() {
    const sortOption = document.getElementById("sortOptions").value;
    const [column, direction] = sortOption.split('-');

    if (!column) return; // Exit if no valid option is selected

    records.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Convert ID values to numbers for correct sorting
        if (column === 'id') {
            valueA = parseInt(valueA);
            valueB = parseInt(valueB);
        }

        // Sort in ascending or descending order
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Re-render the sorted table
    renderRecordsTable();
}
