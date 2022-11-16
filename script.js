let firstName = prompt("What is your name?", "Your name");

console.log("Hello " + firstName);

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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
        <li>
        ${task.content}, ${task.done}
        </li>
        `;
    }
document.querySelector(".js-tasks").innerHTML = htmlString;

  };

  const init = () => {
    render()
  };

  init();
}
