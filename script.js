let taskList = document.querySelector(".taskList");

let textInput = document.querySelector(".textTask");
let colors = document.querySelector(".colors");
let addTask = document.querySelector(".addTask");

let tasks = [];
let massivColors = [, "blue", "#ffa400", "green", "red", "#00d669", "#530cff"];
let list = document.createElement("section");

let renderTaskList = () => {
  if (tasks.length === 0) {
    let localTasks = localStorage.getItem("tasks");
    if (localTasks !== null) {
      tasks = JSON.parse(localTasks);
      // return renderTaskList();
    }
    console.log(localTasks);
  }

  list.innerHTML = tasks
    .map((el) => {
      if (el.checkeds) {
        return `
      <div id=${el.id} class="task">
      <div style="background:gray"><input checked id=${el.id}  type="checkbox" class="checkBox"/></div>
      <div class="solidTask" style="background:gray"><p>${el.newText}</p></div>
      </div>`;
      }
      return `
    <div id=${el.id} class="task">
    <div style="background:${el.color}"><input id=${el.id}  type="checkbox" class="checkBox"/></div>
    <div class="solidTask" style="background:${el.color}"><p>${el.newText}</p></div>
    </div>`;
    })
    .join("");
  taskList.appendChild(list);
};

renderTaskList();

let collig = document.createElement("div");
let idColor = 1;
collig.innerHTML = massivColors
  .map((el) => {
    return `
    <div class="blockColor" id="${idColor++}" style="background:${el}"></div>
  `;
  })
  .join("");

let idColosdadasd = 0;

let selectedTd;
collig.onclick = function (event) {
  let td = event.target.closest("DIV");
  if (!td) return;
  if (!collig.contains(td)) return;
  highlight(td);
};

function highlight(td) {
  if (selectedTd) {
    selectedTd.classList.remove("borderColor");
  }
  idColosdadasd = td.id;
  selectedTd = td;
  selectedTd.classList.add("borderColor");
}

colors.appendChild(collig);

let i = 1;
let checkBox;

addTask.addEventListener("click", (e) => {
  if (textInput.value && idColosdadasd !== 0) {
    let newTask = {
      id: i,
      color: massivColors[idColosdadasd],
      newText: textInput.value,
      checkeds: false,
    };
    i++;
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList();
  }
});
function switchTask(par) {
  par.forEach((element) => {
    element.addEventListener("change", (checkInput) => {
      let target = checkInput.target;
      if (target.tagName === "INPUT") {
        target.checked ? getTargetTrue(target.id) : getTargetFalse(target.id);
      }

      function getTargetFalse(id) {
        return tasks.map((elem) => {
          if (elem.id === +id) {
            elem.checkeds = false;
            // localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTaskList();
          }
        });
      }

      function getTargetTrue(id) {
        return tasks.map((el) => {
          if (el.id === +id) {
            el.checkeds = true;
            // localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTaskList();
          }
        });
      }
    });
  });
}

taskList.addEventListener("click", (e) => {
  checkBox = [...taskList.querySelectorAll("input[type='checkbox']")];
  if (taskList.length !== 0) {
    switchTask(checkBox);
    // localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
