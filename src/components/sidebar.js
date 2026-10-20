import { getTodos, getTodosByProject } from "./todos.js";
import { showTodos } from "./dom-manipulation.js";


export function addSidebarContent() {
    const sidebar = document.querySelector("#sidebar");

    
    const allTasks = document.createElement("div");
    allTasks.textContent = "All Tasks";

    const projects= document.createElement("ul");
    projects.textContent = "My Projects";

    const workProject = document.createElement("li");
    workProject.textContent = "Work";

    const hobbiesProject = document.createElement("li");
    hobbiesProject.textContent = "Hobbies";

    const theOdinProject = document.createElement("li");
    theOdinProject.textContent = "The Odin Project";

    const bucketListProject = document.createElement("li");
    bucketListProject.textContent = "Bucket List";

    sidebar.appendChild(allTasks);
    sidebar.appendChild(projects);
    projects.appendChild(workProject);
    projects.appendChild(hobbiesProject);
    projects.appendChild(theOdinProject);
    projects.appendChild(bucketListProject);


    allTasks.addEventListener("click", () => {
        showTodos(getTodos());
    });

    workProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Work"));
    });

    hobbiesProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Hobbies"));
    });

    bucketListProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Bucket List"));
    });
}

