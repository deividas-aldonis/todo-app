import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const themeSwitchBtn = document.querySelector(".theme-switch-btn");
const headerMobileBg = document.querySelector(".header-mobile-bg");
const headerDesktopBg = document.querySelector(".header-desktop-bg");
const todoContainer = document.querySelector(".todo-container");
const todoFilter = document.querySelector(".todo-filter");
const todoFooterFilter = document.querySelector(".todo-footer-filter");
const todoDndTip = document.querySelector(".dnd-tip");
const filterBtns = document.querySelectorAll(".filter-btn");

const todoItemsLeft = document.querySelector(".todo-left");
const todoList = document.querySelector(".todo-list");
const createTodoBtn = document.querySelector(".add-icon");
const addInput = document.querySelector(".add-todo-input");

const clearBtn = document.querySelector(".clear-btn");

let todos = [];
let filter = "all";

createTodoBtn.addEventListener("click", createTodo);
clearBtn.addEventListener("click", clearCompleted);
todoFilter.addEventListener("click", filterTodos);
todoFooterFilter.addEventListener("click", filterTodos);

Sortable.create(todoList, {
  animation: 150,
  delayOnTouchOnly: true,
  filter: ".ignore-drag",

  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",

  onStart: function (evt) {
    todoList.classList.add("dragging");
  },

  onEnd: function (evt) {
    todos = [...todoList.children];
    todoList.classList.remove("dragging");
  },
});

function createTodo() {
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);

  const li = document.createElement("li");
  if (filter === "completed") li.classList.add("hide");
  li.classList.add("todo-item");
  li.id = uuidv4();
  li.appendChild(clone);

  const paraText = addInput.value.trim();
  const para = li.querySelector("p");
  para.textContent = paraText;

  const removeBtn = li.querySelector(".delete-btn");
  removeBtn.addEventListener("click", removeTodo);

  const completeBtn = li.querySelector(".complete-todo-btn");
  completeBtn.addEventListener("click", completeTodo);

  todos.push(li);

  renderTodos();
  updateLeftItemCounter();
}

function renderTodos() {
  if (todos.length === 0) {
    todoContainer.classList.add("hide");
    todoFilter.classList.add("hide");
    todoDndTip.classList.add("hide");
  } else {
    todoContainer.classList.remove("hide");
    todoFilter.classList.remove("hide");
    todoDndTip.classList.remove("hide");
  }

  todoList.replaceChildren(...todos);
}

function removeTodo(e) {
  const todoItemID = e.target.closest(".todo-item").id;

  const todoItemIndex = todos.findIndex((t) => t.id === todoItemID);
  todos.splice(todoItemIndex, 1);

  renderTodos();
  updateLeftItemCounter();
}

function completeTodo(e) {
  const todoItem = e.target.closest(".todo-item");

  if (todoItem.classList.contains("done")) {
    todoItem.classList.remove("done");

    if (filter === "completed") {
      todoItem.classList.add("hide");
    }
  } else {
    todoItem.classList.add("done");

    if (filter === "active") {
      todoItem.classList.add("hide");
    }
  }

  updateLeftItemCounter();
}

function updateLeftItemCounter() {
  const activeTodosLength = todos.filter(
    (t) => !t.classList.contains("done")
  ).length;
  let itemLeftText;

  if (activeTodosLength === 1) itemLeftText = "1 item left";
  else itemLeftText = `${activeTodosLength} items left`;

  todoItemsLeft.textContent = itemLeftText;
}

function clearCompleted() {
  todos = todos.filter((t) => !t.classList.contains("done"));

  renderTodos();
  updateLeftItemCounter();
}

function filterTodos(e) {
  const clicked = e.target.tagName.toLowerCase();

  if (clicked === "div") return;

  filter = e.target.dataset.filter;

  filterBtns.forEach((btn) => {
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const todoItems = [...todoList.children];
  todoItems.forEach((todo) => todo.classList.remove("hide"));

  if (filter === "active") {
    const completedTodos = todoItems.filter((todo) =>
      todo.classList.contains("done")
    );
    completedTodos.forEach((todo) => todo.classList.add("hide"));
  } else if (filter === "completed") {
    const activeTodos = todoItems.filter(
      (todo) => !todo.classList.contains("done")
    );
    activeTodos.forEach((todo) => todo.classList.add("hide"));
  }
}

themeSwitchBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  const currentTheme = target.dataset.currentTheme;

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    target.setAttribute("data-current-theme", "dark");
    headerMobileBg.style.backgroundImage = 'url("./images/bg-mobile-dark.jpg")';
    headerDesktopBg.style.backgroundImage =
      'url("./images/bg-desktop-dark.jpg")';
  } else {
    document.documentElement.removeAttribute("data-theme");
    target.setAttribute("data-current-theme", "light");
    headerMobileBg.style.backgroundImage =
      'url("./images/bg-mobile-light.jpg")';
    headerDesktopBg.style.backgroundImage =
      'url("./images/bg-desktop-light.jpg")';
  }
});
