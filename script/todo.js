myArray = JSON.parse(localStorage.getItem('todoList')) || [{ name: 'add some work', duedate: '2024-09-04' }];

rendertodo();

function rendertodo() {
    let display = '';
    for (let i = 0; i < myArray.length; i++) {
        const todoobject = myArray[i];
        const { name, duedate } = todoobject;

        // Check if the task is marked as done in localStorage
        const isDone = todoobject.done ? 'checked' : '';

        const element = `
        <div class="todo-item">
            <input type='checkbox' ${isDone} onchange="workDone(${i});"> 
            <span class="task ${isDone ? 'completed' : ''}">${name}</span>
            <span class="date">${duedate}</span>
            <button class="delete-btn" onclick="
                myArray.splice(${i}, 1); 
                rendertodo();
                saveToStorage();
            ">DELETE</button>
        </div>`;

        display += element;
    }

    document.querySelector('.to-do-show').innerHTML = display;
}

function workDone(index) {
    // Toggle the 'done' property in the array for the specific task
    myArray[index].done = !myArray[index].done;
    saveToStorage();
    rendertodo();
}

function handlekeydown(event) {
    if (event.key === 'Enter') {
        todoWork();
    }
}

function todoWork() {
    let inputElement = document.querySelector('input').value;
    let inputDateElement = document.querySelector('#date').value;

    if (inputElement === '' || inputDateElement === '') {
        alert("Please fill in both the text and date fields.");
    } else {
        let index = myArray.findIndex(item => item.name === 'add some work');
        if (index !== -1) {
            myArray.splice(index, 1);
        }

        myArray.push({ name: inputElement, duedate: inputDateElement, done: false });
    }

    saveToStorage();
    document.querySelector('input').value = '';
    document.querySelector('#date').value = '';
    rendertodo();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(myArray));
}
