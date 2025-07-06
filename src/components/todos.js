export const myTodos = [];

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
    }

        get id() {
            return this.assignID();
        }

        assignID() {
            return self.crypto.randomUUID()
        }
}

export function createTodo(title, description, dueDate, project, priority) {
    let newTodo = new Todo(title, description, dueDate, project, priority);
    myTodos.push(newTodo);
}