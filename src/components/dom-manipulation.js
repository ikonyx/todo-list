import { myTodos, createTodo } from "./todos.js"

let id;

export function addTodosToDom() {
    const form = document.querySelector("#form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const dueDate = document.querySelector("#dueDate").value;
        const project = document.querySelector("#project").value;
        const priority = document.querySelector("#priority").value;

        createTodo(title, description, dueDate, project, priority, id);

        todoInfoDialog.close(displayTask(myTodos[myTodos.length - 1]));
    
        form.reset();
    });
}

function displayTask(todo) {
    const todosContainer = document.querySelector("#todos-container");
    const todoWrapper = document.createElement("li");
    todoWrapper.className = "todoWrapper";
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.title;
    const todoDueDate = document.createElement("div");
    todoDueDate.textContent = todo.dueDate;

    todoWrapper.appendChild(todoDiv);
    todosContainer.appendChild(todoWrapper);
    addCheckbox();

    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDueDate);
    

    addDetails();
    
}

function addCheckbox() {
    const priority = document.querySelector("#priority").value;
    const lastTodo = document.querySelector("#todos-container li:last-child .todo");
    const checkbox = document.createElement('input');
    checkbox.className = "checkbox";
    checkbox.type = 'checkbox';
    checkbox.dataset.indexNumber = myTodos.at(-1).id;

    lastTodo.appendChild(checkbox);

    if (priority == "Done") {
        checkbox.checked = true;
    }
}

function addDetails() {
    const lastTodo = document.querySelector("#todos-container li:last-child .todo");
    const detailsIcon = document.createElement('div');
    detailsIcon.textContent = "details";
    detailsIcon.dataset.indexNumber = myTodos.at(-1).id;

    lastTodo.appendChild(detailsIcon);

    detailsIcon.addEventListener("click", showTodoDetails);

    function showTodoDetails() {
        const details = document.querySelector('.details');
        if (details) details.remove();
        if (details) {
            if (details.dataset.indexNumber == detailsIcon.dataset.indexNumber) {
                details.remove();
                return;
            }    
        }

        for (let todo of myTodos) {

            const detailsDiv = document.createElement('div');
            detailsDiv.className = "details";
            
            if (todo.id == detailsIcon.dataset.indexNumber) {
                detailsDiv.dataset.indexNumber = detailsIcon.dataset.indexNumber;
                const selectedTodo = detailsIcon.closest('.todo');
                const selectedTodoWrapper = selectedTodo.closest('.todoWrapper');
                console.log(selectedTodoWrapper);
                console.log(selectedTodo);
                const description = document.createElement('div');
                description.textContent = `Description: ${todo.description}`
                const dueDate = document.createElement('div');
                dueDate.textContent = `Due Date: ${todo.dueDate}`
                const priority = document.createElement('div');
                priority.textContent = `Priority: ${todo.priority}`

                detailsDiv.appendChild(description);
                detailsDiv.appendChild(dueDate);
                detailsDiv.appendChild(priority);
                
                selectedTodoWrapper.appendChild(detailsDiv);
                

            }   
        }   
    }
}


export function displayDialog() {
    const header = document.querySelector("header");
    const dialogBtn = document.createElement('button');
    dialogBtn.textContent = "Add Task";

    document.querySelector("#dueDate").min = new Date().toISOString().split("T")[0];

    header.appendChild(dialogBtn);

    dialogBtn.addEventListener("click", addTodoInfo);

    function addTodoInfo() {
        const todoInfoDialog = document.querySelector("#todoInfoDialog");
        todoInfoDialog.showModal();
    }
}