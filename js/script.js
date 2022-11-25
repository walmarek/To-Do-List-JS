console.log("Hi everyone!");
{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-task-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-task-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let taskContentHTML = "";

    for (const task of tasks) {
      taskContentHTML += `
       <li class="section__item">
           <button
              class="section__item--button section__item--button-toggleDone js-task-done"
              alt="checkbox button"
            >
              <img class="section__item--button-icon" ${
                task.done ? "" : 'style="display: none"'
              } src="images/checkmark-24.ico"/>
            </button>
           <span class="section__item--content" ${
             task.done ? 'style="text-decoration: line-through"' : ""
           }
            >${task.content}
            </span>
           <button
             class="section__item--button section__item--button-remove js-task-remove"
             alt="delete button"
            >
             <img class="section__item--button-icon"
              src="images/bin24x24.ico"/>
           </button>
       </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = taskContentHTML;

    bindRemoveEvents();
    bindToggleDoneEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-form-input");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
