import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const themeSwitchBtn = document.querySelector(".theme-switch-btn");
const headerBackgroundImage = document.querySelector(
  ".header-background-image"
);
const todoContainer = document.querySelector(".todo-container");
const todoFilter = document.querySelector(".todo-filter");
const todoDndTip = document.querySelector(".dnd-tip");

const todoItemsLeft = document.querySelector(".todo-left");
const todoList = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-icon");
const addInput = document.querySelector(".add-todo-input");

let todoLeftItemCounter = 0;
const todos = [];

// Theme switcher logic
themeSwitchBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  const currentTheme = target.dataset.currentTheme;

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    target.setAttribute("data-current-theme", "dark");
    headerBackgroundImage.style.backgroundImage =
      'url("./images/bg-mobile-dark.jpg")';
  } else {
    document.documentElement.removeAttribute("data-theme");
    target.setAttribute("data-current-theme", "light");
    headerBackgroundImage.style.backgroundImage =
      'url("./images/bg-mobile-light.jpg")';
  }
});

// CRUD logic
addBtn.addEventListener("click", () => {
  const inputValue = addInput.value.trim();

  if (!inputValue) return;

  const id = uuidv4();

  const listItem = `<li class="todo-item" id=${id} >
                      <div>
                        <div class="icon complete-todo-btn prevent-select">
                          <img
                            class="icon-image"
                            src="./images/icon-check.svg"
                            alt="check icon"
                          />
                        </div>
                        <p>${inputValue}</p>
                      </div>
                      <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                      </svg>
                    </li>`;

  todoList.insertAdjacentHTML("beforeend", listItem);

  const todoItems = todoList.querySelectorAll(".todo-item");
  const newlyAddedTodo = todoItems[todoItems.length - 1];

  const todoAddBtn = newlyAddedTodo.querySelector(".complete-todo-btn");
  const todoDeleteBtn = newlyAddedTodo.querySelector(".delete-btn");

  todoAddBtn.addEventListener("click", completeTodo);
  todoDeleteBtn.addEventListener("click", deleteTodo);

  updateTodoUI();
  addTodoLeft();
  addInput.value = "";
  todos.push(newlyAddedTodo);
});

function completeTodo(e) {
  const todoItem = e.target.closest(".todo-item");

  if (todoItem) {
    if (todoItem.classList.contains("done")) {
      todoItem.classList.remove("done");
      addTodoLeft();
    } else {
      todoItem.classList.add("done");
      removeTodoLeft();
    }
  }
}

function deleteTodo(e) {
  const todoItem = e.target.closest(".todo-item");
  todoItem.remove();

  const index = todos.findIndex((t) => t.id === todoItem.id);
  todos.splice(index, 1);

  updateTodoUI();

  if (!todoItem.classList.contains("done")) {
    removeTodoLeft();
  }
}

function updateTodoUI() {
  const todoItems = document.querySelectorAll(".todo-item").length;

  if (todoItems === 0) {
    todoContainer.classList.add("hide");
    todoDndTip.classList.add("hide");
    todoFilter.classList.add("hide");
  } else if (todoItems > 0 && todoContainer.classList.contains("hide")) {
    todoContainer.classList.remove("hide");
    todoDndTip.classList.remove("hide");
    todoFilter.classList.remove("hide");
  }
}

function addTodoLeft() {
  todoLeftItemCounter++;

  if (todoLeftItemCounter === 1) {
    todoItemsLeft.textContent = "1 item left";
  } else {
    todoItemsLeft.textContent = `${todoLeftItemCounter} items left`;
  }
}

function removeTodoLeft() {
  todoLeftItemCounter--;

  if (todoLeftItemCounter === 1) {
    todoItemsLeft.textContent = "1 item left";
  } else {
    todoItemsLeft.textContent = `${todoLeftItemCounter} items left`;
  }
}

todoFilter.addEventListener("click", (e) => {
  const target = e.target.tagName.toLowerCase();

  todoFilter.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (target === "button") {
    e.target.classList.add("active");

    const filter = e.target.dataset.filter;

    if (filter === "completed") {
      const completed = todos.filter((t) => t.classList.contains("done"));
      todoList.replaceChildren(...completed);
    } else if (filter === "active") {
      const active = todos.filter((t) => !t.classList.contains("done"));
      todoList.replaceChildren(...active);
    } else {
      todoList.replaceChildren(...todos);
    }
  }
});
