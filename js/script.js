console.log("Hi everyone");

{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
    document.querySelector(".js-form-input").value = "";
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  document.querySelector(".js-form-button").addEventListener("click", () => {
    document.querySelector(".js-form-input").focus();
  });

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-task-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const taggleDoneButtons = document.querySelectorAll(".js-task-done");

    taggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
       <li class="section--tasks-list">
         <div class="section--tasks-item">
           <button
             class="section--tasks-itemButton section--tasks-itemButton-done js-task-done"
             alt="checkbox button"
             ><img class="section--tasks-itemButton-doneChecked" ${
               task.done ? "" : 'style="display: none"'
             } src="../images/checkmark-24.ico"/>
           </button>
         </div>
         <div class="section--task-itemContent" ${
           task.done ? 'style="text-decoration: line-through"' : ""
         }>${task.content}
         </div>
       
          <div class="section--tasks-item">
           <button
             class="section--tasks-itemButton section--tasks-itemButton-remove  js-task-remove"
             alt="detete button"
             >
             <img
              src="../images/bin32x32.ico"
             />
           </button>
         </div>
       </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document
      .querySelector(".js-form-input")
      .value.trim();
    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);

    onFormSubmit.value = "";
  };

  init();
}
