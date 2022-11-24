//SELECTORS
const input = document.querySelector(".todo-input");
const submitBtn = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
console.log(todoList);

//EVENT LISTENERS
submitBtn.addEventListener("click", addTodo);

//FUNCTIONS

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
