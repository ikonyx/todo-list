import { createTodo, editTodo } from "./todos.js"

let editingTodoId = null;

export function addTodosToDom() {
    const form = document.querySelector("#form");

    const cancelBtn = document.querySelector("#cancelBtn");
    const todoInfoDialog = document.querySelector("#todoInfoDialog");

    cancelBtn.addEventListener("click", () => {
        todoInfoDialog.close();
        form.reset();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const todoData = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            dueDate: document.querySelector("#dueDate").value,
            project: document.querySelector("#project").value,
            priority: document.querySelector("#priority").value
        };

        saveTodo(todoData);

        todoInfoDialog.close();
        form.reset();
    });
}


function saveTodo(todoData) { 
    if (editingTodoId === null) {
        const newTodo = createTodo(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.project,
            todoData.priority
        );

        displayTask(newTodo);
        return; 
    }


    editTodo(editingTodoId, todoData);

    const todoElement = document.querySelector(
    `.todoWrapper [data-index-number="${editingTodoId}"]`
    );

    let todoWrapper = null;

    if (todoElement) {
        todoWrapper = todoElement.closest(".todoWrapper");
    }

    if (todoWrapper) {
        const todoDiv = todoWrapper.querySelector(".todo");
        const textElements = todoDiv.querySelectorAll("div");

        textElements[0].textContent = todoData.title;
        textElements[1].textContent = todoData.dueDate;
    }

    const detailsSection = document.querySelector(
        `.details[data-index-number="${editingTodoId}"]`
    );

    if (detailsSection) {
        detailsSection.children[0].textContent =
            `Description: ${todoData.description}`;
        detailsSection.children[1].textContent =
            `Due Date: ${todoData.dueDate}`;
        detailsSection.children[2].textContent =
            `Priority: ${todoData.priority}`;
    }

    editingTodoId = null; 
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
    
    addCheckbox(todo, todoDiv);

    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDueDate);
    
    
    addDetails(todo, todoDiv);
    
}

function addCheckbox(todo, todoDiv) {

    const checkbox = document.createElement('input');
    checkbox.className = "checkbox";
    checkbox.type = 'checkbox';
    checkbox.dataset.indexNumber = todo.id;

    todoDiv.appendChild(checkbox);

    if (todo.priority === "Done") {
        checkbox.checked = true;
    }
}

function addDetails(todo, todoDiv) {
    const detailsIcon = document.createElement('div');
    detailsIcon.textContent = "details";
    detailsIcon.dataset.indexNumber = todo.id;

    todoDiv.appendChild(detailsIcon);

    detailsIcon.addEventListener("click", showTodoDetails);

    function showTodoDetails() {
        const selectedTodo = detailsIcon.closest(".todoWrapper"); 
        const existingDetails = selectedTodo.querySelector(".details"); 

        const shouldClose = Boolean(existingDetails);

        const openDetails = document.querySelector("#todos-container .details");

        if (openDetails) {
        openDetails.remove();
        }

        if (shouldClose) {
        return;
        }

        if (existingDetails) { 
            existingDetails.remove();
            return;
        }

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "details";
        detailsDiv.dataset.indexNumber = todo.id; 

        const description = document.createElement("div");
        description.textContent = `Description: ${todo.description}`;

        const dueDate = document.createElement("div");
        dueDate.textContent = `Due Date: ${todo.dueDate}`;

        const priority = document.createElement("div");
        priority.textContent = `Priority: ${todo.priority}`;

        detailsDiv.appendChild(description);
        detailsDiv.appendChild(dueDate);
        detailsDiv.appendChild(priority);

        selectedTodo.appendChild(detailsDiv);

        editTodoInDom(todo);        
                
    }   
}   
    

export function displayDialog() {
    const header = document.querySelector("header");
    const dialogBtn = document.createElement('button');
    dialogBtn.textContent = "Add Task";

    header.appendChild(dialogBtn);

    dialogBtn.addEventListener("click", addTodoInfo);

    function addTodoInfo() {
        const todoInfoDialog = document.querySelector("#todoInfoDialog");
        todoInfoDialog.showModal();
    }
}

function editTodoInDom(todo) {
    const activeDetailsSection = document.querySelector('.details');
    const detailsIcons = document.createElement('div');
    const editIcon = document.createElement('div');
    editIcon.textContent = "edit";

    detailsIcons.appendChild(editIcon)
    activeDetailsSection.appendChild(detailsIcons);

    editIcon.addEventListener("click", editTodoDetails);

    function editTodoDetails() {
        const todoInfoDialog = document.querySelector("#todoInfoDialog");
        
        const titleInput = document.querySelector("#title");
        const descriptionInput = document.querySelector("#description");
        const dueDateInput = document.querySelector("#dueDate");
        const projectInput = document.querySelector("#project");
        const priorityInput = document.querySelector("#priority");

        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dueDateInput.value = todo.dueDate;
        projectInput.value = todo.project;
        priorityInput.value = todo.priority;

        editingTodoId = todo.id;

        todoInfoDialog.showModal();

    }
}