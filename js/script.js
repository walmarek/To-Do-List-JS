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

  const focusOnInput = () => {
    const formButton = document.querySelector(".js-form-button");

    formButton.addEventListener("click", () => {
      document.querySelector(".js-form-input").focus();
    });
  };

  focusOnInput();

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
       <li class="section__item">
         <div class="section__item-element">
           <button
              class="section__item--button section__item--button-done js-task-done"
              alt="checkbox button"
            ><img class="section__item--button-checked" ${
              task.done ? "" : 'style="display: none"'
             } src="images/checkmark-24.ico"/>
            </button>
         </div>
         <div class="section__item--content" ${
           task.done ? 'style="text-decoration: line-through"' : ""}
          >${task.content}
          </div>
          <div class="section__item--element">
           <button
             class="section__item--button section__item--button-remove js-task-remove"
             alt="delete button"
            >
             <img
              src="images/bin32x32.ico"
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
