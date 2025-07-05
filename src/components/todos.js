export class Todo {
    constructor(title, description, dueDate, project, priority, checklist) {
        if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
        }

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.checklist = checklist;
    }

        get id() {
            return this.assignID();
        }

        assignID() {
            return self.crypto.randomUUID()
        }
}