import { myTodos, createTodo } from "./todos.js"

export function addTodosToDom() {
    const form = document.querySelector("#form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const dueDate = document.querySelector("#dueDate").value;
        const project = document.querySelector("#project").value;
        const priority = document.querySelector("#priority").value;

        createTodo(title, description, dueDate, project, priority);

        todoInfoDialog.close(displayTask(myTodos[myTodos.length - 1]));
    
        form.reset();

    });
}

function displayTask(todo) {
    const todosDiv = document.querySelector("#todos-container");
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.title;;
    const todoDueDate = document.createElement("div");
    todoDueDate.textContent = todo.dueDate;

    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDueDate);
    todosDiv.appendChild(todoDiv);
}


export function displaydialog() {
    const container = document.querySelector("#container");
    const dialogBtn = document.createElement('button');
    dialogBtn.textContent = "Add Task";

    container.appendChild(dialogBtn);

    dialogBtn.addEventListener("click", addTodoInfo);

    function addTodoInfo() {
        const todoInfoDialog = document.querySelector("#todoInfoDialog");
        todoInfoDialog.showModal();
    }
}