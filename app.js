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
addBtn.addEventListener("click", (e) => {
  const inputValue = addInput.value.trim();

  if (!inputValue) return;

  const listItem = `<li class="todo-item">
                      <div >
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

  updateTodoLeft("add");
});

function completeTodo(e) {
  const todoItem = e.target.closest(".todo-item");

  if (todoItem) {
    if (todoItem.classList.contains("done")) {
      todoItem.classList.remove("done");
    } else {
      todoItem.classList.add("done");
    }
  }
}

function deleteTodo(e) {
  const todoItem = e.target.closest(".todo-item");
  todoItem.remove();
  updateTodoLeft("minus");
}

function updateTodoLeft(operation) {
  if (operation === "add") {
    todoLeftItemCounter++;

    if (todoLeftItemCounter === 1) {
      todoItemsLeft.textContent = "1 item left";
    } else if (todoLeftItemCounter > 1) {
      todoItemsLeft.textContent = `${todoLeftItemCounter} items left`;
    }
  } else {
    todoLeftItemCounter--;

    if (todoLeftItemCounter === 0) {
      todoItemsLeft.textContent = `All completed`;
    } else if (todoLeftItemCounter === 1) {
      todoItemsLeft.textContent = `1 item left`;
    } else {
      todoItemsLeft.textContent = `${todoLeftItemCounter} items left`;
    }
  }
}
