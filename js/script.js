console.log("Hi everyone!");
{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

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

  const bindToggleAllEventsDone = () => {
    const toggleAllDoneButton = document.querySelector(".js-all-done-button");

    if (toggleAllDoneButton) {
      toggleAllDoneButton.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    }
  };

  const bindHideDoneEvents = () => {
    const hideTasksButton = document.querySelector(".js-hide-button");

    if (hideTasksButton) {
      hideTasksButton.addEventListener("click", () => {
        toggleHideDoneTasks();
      });
    }
  };

  const renderButtons = () => {
    let taskOptionButtonsHTML = "";

    if (tasks.length !== 0) {
      taskOptionButtonsHTML += `
      <button class="section__list--button js-hide-button">
        ${hideDoneTasks ? "Show" : "Hide"} completed
      </button>
      <button class="section__list--button js-all-done-button" 
       ${tasks.every(({ done }) => done) ? "disabled" : ""}>Complete all
      </button>`;
    }

    document.querySelector(".js-list-buttons").innerHTML =
      taskOptionButtonsHTML;
  };

  const renderTasks = () => {
    let taskContentHTML = "";

    for (const task of tasks) {
      taskContentHTML += `
     <li class="section__item ${
       task.done && hideDoneTasks ? "section__item--hidden" : ""
     }">
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
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindToggleAllEventsDone();
    bindHideDoneEvents();
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
