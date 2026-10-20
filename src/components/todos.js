let myTodos = [];

class Todo {
    constructor(title, description, dueDate, project, priority) {
        if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
        }

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.id = self.crypto.randomUUID();
    }
}

export function createTodo(title, description, dueDate, project, priority) {
    const newTodo = new Todo(title, description, dueDate, project, priority);
    myTodos.push(newTodo);

    saveTodos();

    return newTodo;
}

export function getTodos() { 
    return [...myTodos];
}

export function editTodo(id, editedTodo) {
    const todo = myTodos.find(todo => todo.id === id);

    if (!todo) return false;

    Object.assign(todo, editedTodo);

    saveTodos();

    return true;
}

export function setTodoCompletion(id, isCompleted) {
    const todo = myTodos.find(todo => todo.id === id);

    if (!todo) return false;

    todo.isCompleted = isCompleted;

    console.log("Updated Todo:", todo);

    saveTodos();

    return true;
}

export function deleteTodo(id) {
    const index = myTodos.findIndex(todo => todo.id === id);

    if (index === -1) return false;

    myTodos.splice(index, 1);

    console.log(getTodos());

    saveTodos();

    return true;
}

export function getTodosByProject(projectName) {
    return myTodos.filter(todo => todo.project === projectName);
}

export function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(myTodos));
}

export function loadTodos() {
    const savedTodos = localStorage.getItem("todos");

    if (!savedTodos) return;

    myTodos = JSON.parse(savedTodos).map(savedTodo => {
        const todo = new Todo(
            savedTodo.title,
            savedTodo.description,
            savedTodo.dueDate,
            savedTodo.project,
            savedTodo.priority
        );

        todo.id = savedTodo.id;

        if (savedTodo.isCompleted !== undefined) {
            todo.isCompleted = savedTodo.isCompleted;
        } else {
            todo.isCompleted = false;
        }

        return todo;
    });
}