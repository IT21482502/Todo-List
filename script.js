const todoCreateButton = document.querySelector(".todo__create__button");
const todoInput = document.querySelector(".todo__input");
const todoContainer = document.querySelector(".todo__container");

const todoValues = [];
let todoElements = [];

// update the current date
function updateDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  
  document.querySelector('.today-date').textContent = dateString;
}

// calling the function
updateDate();


// update current time
function updateTime() {
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const timeString = now.toLocaleTimeString('en-US', options);
  
  document.querySelector('.container__header__time h1').textContent = timeString;
}

// time function calling
updateTime();

// updating time every 1000ms (1 second )
setInterval(updateTime, 1000);

todoCreateButton.addEventListener("click", () => {
  const value = todoInput.value;
  if (value === "") {
    return;
  }
  todoValues.push(value);
  console.log(todoValues);
  todoInput.value = "";

  renderTodos(); // Render the updated todo list
});

function renderTodos() {
  todoElements = todoValues.map((val, index) => {
    return `<div class="todo__item">
          <div class="todo__item__left">
            <input type="checkbox" id="completed-${index}" name="completed" />
            <span class="todo-text">${val}</span>
          </div>
          <div class="todo__item__right">
            <svg
              class="todo__delete__button"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </div>
        </div>`;
  });

  todoContainer.innerHTML = todoElements.join(" "); 

  // check box eventlitner
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener("change", (event) => {
      const todoText = checkbox.nextElementSibling;
      if (event.target.checked) {
        todoText.style.textDecoration = "line-through"; // Cross out the text when checked
        todoText.style.color = "red"; // Change text color to red when checked
      } else {
        todoText.style.textDecoration = "none"; // remove the crossed line
        todoText.style.color = "black"; // change back to previous status
      }
    });
  });

  //Delete buttons event listner
  document.querySelectorAll(".todo__delete__button").forEach((button, index) => {
    button.addEventListener("click", () => {
      todoValues.splice(index, 1); // removing the value from array
      renderTodos();
    });
  });
}