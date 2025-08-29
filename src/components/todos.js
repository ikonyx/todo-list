export const myTodos = [];

class Todo {
    constructor(title, description, dueDate, project, priority, id) {
        if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
        }

        id = self.crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.id = id;
    }
}

export function createTodo(title, description, dueDate, project, priority, id) {
    let newTodo = new Todo(title, description, dueDate, project, priority, id);
    myTodos.push(newTodo);
}