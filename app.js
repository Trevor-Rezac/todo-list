//SELECTORS

const input = document.querySelector(".todo-input");
const submitBtn = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");

//EVENT LISTENERS

submitBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);

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

function deleteComplete(e) {
  console.log(e.target);
  const clickedBtn = e.target;

  //Delete
  if (clickedBtn.classList[0] === "delete-btn") {
    const todo = clickedBtn.parentElement;

    //Add class for animation
    //'transitionend' triggers function after class is added
    todo.classList.add("deleted");
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
