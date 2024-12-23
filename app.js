// selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const fil = document.querySelector(".filter-todos");
let todoArr = [];

// event listeners
document.addEventListener("DOMContentLoaded", retLocal);
todoBtn.addEventListener("click", addTodoUI);
todoList.addEventListener("click", deleteCheck);
fil.addEventListener("click", filterfunc);

//functions

function retLocal() {
  // console.log(localStorage.getItem("todos"));
  if (localStorage.getItem("todos")) {
    todoArr = JSON.parse(localStorage.getItem("todos"));
    // console.log("Retrived empty array");
    todoArr.forEach(function (todo) {
      addtodo(todo);
    });
  }
}

function delLocal(index) {
  todoArr.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoArr));
}

function addtodo(todoText) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoText;
  todoDiv.appendChild(newTodo);

  const compBtn = document.createElement("button");
  compBtn.innerHTML = `<i class="fas fa-check"></i>`;
  compBtn.classList.add("comp-btn");
  todoDiv.appendChild(compBtn);

  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  delBtn.classList.add("del-btn");
  todoDiv.appendChild(delBtn);

  todoList.appendChild(todoDiv);
}

function addTodoUI(event) {
  event.preventDefault();
  addtodo(todoInput.value);
  todoArr.push(todoInput.value);
  localStorage.setItem("todos", JSON.stringify(todoArr));
  todoInput.value = "";
}

function deleteCheck(e) {
  const currItem = e.target;
  if (currItem.classList[0] === "del-btn") {
    const currTodo = currItem.parentElement;
    currTodo.classList.add("fall");
    const indexToDel = todoArr.indexOf(currTodo.childNodes[0].innerText);
    delLocal(indexToDel);
    currTodo.addEventListener("transitionend", function () {
      currTodo.remove();
    });
  } else if (currItem.classList[0] === "comp-btn") {
    const currTodo = currItem.parentElement;
    currTodo.classList.toggle("complete");
  }
}

function filterfunc(e) {
  const currSel = e.target.value;
  const todoItems = todoList.childNodes;
  switch (currSel) {
    case "all":
      todoItems.forEach(function (item) {
        item.style.display = "flex";
      });
      break;
    case "complete":
      todoItems.forEach(function (item) {
        if (item.classList[1] !== "complete") {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
      });
      break;
    case "incomplete":
      todoItems.forEach(function (item) {
        if (item.classList[1] === "complete") {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
      });
      break;
  }
}
