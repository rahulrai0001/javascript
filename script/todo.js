
        myArray = [ {name:'add some work', duedate:'2024-09-04'}];

        rendertodo();
        function rendertodo(){
            display = '';
            for (let i = 0; i < myArray.length; i++) {
                const todoobject = myArray[i];
                const {name, duedate} = todoobject;

                const element = `
                <div class="todo-item">
                    <span class="task">${name}</span>
                    <span class="date">${duedate}</span>
                    <button class="delete-btn" onclick="
                        myArray.splice(${i}, 1); 
                        rendertodo();
                    ">DELETE</button>
                </div>`;
                
                display += element;
            }

            document.querySelector('.to-do-show').innerHTML = display;
        }

        function handlekeydown(event){
            if (event.key === 'Enter'){
                todoWork();
            }
        }

        function todoWork(){
            let inputElement = document.querySelector('input').value;
            let inputDateElement = document.querySelector('#date').value;

            if (inputElement === '' || inputDateElement === '') {
                alert("Please fill in both the text and date fields.");
            } else {
                let index = myArray.findIndex(item => item.name === 'add some work');
                if (index !== -1) {
                    myArray.splice(index, 1);
                }

                myArray.push({name: inputElement, duedate: inputDateElement});
            }

            document.querySelector('input').value = '';
            document.querySelector('#date').value = '';
            rendertodo();
        }
    