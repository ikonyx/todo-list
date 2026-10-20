import "./styles.css";
import { displayDialog, addTodosToDom } from "./components/dom-manipulation.js";
import { addSidebarContent } from "./components/sidebar.js";
import { loadTodos } from "./components/todos.js";

loadTodos();
displayDialog();
addTodosToDom();
addSidebarContent();