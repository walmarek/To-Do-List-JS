// let firstName = prompt("What is your name?", "Your name");

// console.log("Hello " + firstName);

{
  const tasks = [
    {
      content: "record video",
      done: false,
    },
    {
      content: "eat dinner",
      done: true,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  }


  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li${task.done ? ' style="text-decoration: line-through"' : ""}>
        <button class="js-remove">delete</button>
        ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
       removeTask(index);
      });
    });
  };

  
  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-form-task").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
