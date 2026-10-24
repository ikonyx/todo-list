import { getTodos, getTodosByProject, getTodosByDate } from "./todos.js";
import { showTodos } from "./dom-manipulation.js";


function addAllTasks(sidebar) {
    const allTasks = document.createElement("div");
    allTasks.textContent = "All Tasks";

    sidebar.appendChild(allTasks);

    allTasks.addEventListener("click", () => {
        showTodos(getTodos());
    });
}

function addDateFilters(sidebar) {
    const dateFiltersTitle = document.createElement("h3");
    dateFiltersTitle.textContent = "Date Filters";

    const dateFilters= document.createElement("ul");

    const overdue = document.createElement("li");
    overdue.textContent = "Overdue";

    const today = document.createElement("li");
    today.textContent = "Today";

    const thisMonth = document.createElement("li");
    thisMonth.textContent = "This Month";

    sidebar.appendChild(dateFiltersTitle);
    sidebar.appendChild(dateFilters);
    dateFilters.appendChild(overdue);
    dateFilters.appendChild(today);
    dateFilters.appendChild(thisMonth);


    overdue.addEventListener("click", () => {
        showTodos(getTodosByDate("Overdue"));
    });

    today.addEventListener("click", () => {
        showTodos(getTodosByDate("Today"));
    });

    thisMonth.addEventListener("click", () => {
        showTodos(getTodosByDate("This Month"));
    });
}

function addProjects(sidebar) {
    const projectsTitle = document.createElement("h3");
    projectsTitle.textContent = "Projects";

    const projects= document.createElement("ul");

    const workProject = document.createElement("li");
    workProject.textContent = "Work";

    const hobbiesProject = document.createElement("li");
    hobbiesProject.textContent = "Hobbies";

    const theOdinProject = document.createElement("li");
    theOdinProject.textContent = "The Odin Project";

    const bucketListProject = document.createElement("li");
    bucketListProject.textContent = "Bucket List";

    sidebar.appendChild(projectsTitle);
    sidebar.appendChild(projects);
    projects.appendChild(workProject);
    projects.appendChild(hobbiesProject);
    projects.appendChild(theOdinProject);
    projects.appendChild(bucketListProject);


    workProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Work"));
    });

    hobbiesProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Hobbies"));
    });

    theOdinProject.addEventListener("click", () => {
        showTodos(getTodosByProject("The Odin Project"));
    });

    bucketListProject.addEventListener("click", () => {
        showTodos(getTodosByProject("Bucket List"));
    });
}


export function addSidebarContent() {
    const sidebar = document.querySelector("#sidebar");

    addAllTasks(sidebar);
    addDateFilters(sidebar);
    addProjects(sidebar);
    
}

