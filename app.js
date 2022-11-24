//SELECTORS

const input = document.querySelector(".todo-input");
const submitBtn = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
submitBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
filter.addEventListener("change", filterTodo);

//FUNCTIONS

//CREATE A NEW TODO ITEM
function addTodo(e) {
  e.preventDefault();

  //create todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-container");

  //create todo list item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.innerText = input.value;
  todoDiv.appendChild(todoItem);

  //Save todo to localStorage
  saveTodo(input.value);

  //Add 'complete' button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);

  //Add 'delete' button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  //Append the todoDiv to the todoDiv ul element
  todoList.appendChild(todoDiv);
  //clear input value
  input.value = "";
}

//DELETE TODO ITEM
function deleteComplete(e) {
  const clickedBtn = e.target;

  //Delete
  if (clickedBtn.classList[0] === "delete-btn") {
    const todo = clickedBtn.parentElement;

    //Add class for animation
    //'transitionend' triggers function after class is added
    todo.classList.add("deleted");
    deleteTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Complete
  if (clickedBtn.classList[0] === "complete-btn") {
    const todo = clickedBtn.parentElement;
    todo.classList.toggle("completed");
  }
}

//FILTER TODO LIST FUNCTION
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//SAVE TODO TO LOCAL STORAGE
function saveTodo(todo) {
  //First check if any todos already in local storage
  let todos;

  //if no todos, create a new empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];

    //otherwise, parse the local storage todos into JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //push the new todo to the todo array, and set the item in local storage by stringifying the JSON data
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//GET TODOs FROM LOCAL STORAGE TO DISPLAY ON PAGE LOAD
function getTodos() {
  //First check if any todos already in local storage
  let todos;

  //if no todos, create a new empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];

    //otherwise, parse the local storage todos into JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //create todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-container");

    //create todo list item
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = todo;
    todoDiv.appendChild(todoItem);

    //Add 'complete' button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    //Add 'delete' button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    //Append the todoDiv to the todoDiv ul element
    todoList.appendChild(todoDiv);
  });
}

//DELETE TODOs FROM LOCAL STORAGE
function deleteTodo(todo) {
  //First check if any todos already in local storage
  let todos;

  //if no todos, create a new empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];

    //otherwise, parse the local storage todos into JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const deletedTodo = todo.children[0].innerText;
  todos.splice(todos.indexOf(deletedTodo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
