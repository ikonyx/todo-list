export function addSidebarContent() {
    const sidebar = document.querySelector("#sidebar");

    const defaultList = document.createElement("ul");
    const allTasks = document.createElement("li");
    allTasks.textContent = "All Tasks";

    sidebar.appendChild(defaultList);
    sidebar.appendChild(allTasks);
}