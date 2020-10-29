let taskList = document.querySelector(".taskList");

let textInput = document.querySelector(".textTask");
let colors = document.querySelector(".fieldColors");

let tasks = [];
let massivColors = [, "blue", "#ffa400", "green", "red", "#00d669", "#530cff"];
let list = document.createElement("section");

let renderTaskList = () => {
  if (tasks.length === 0) {
    let localTasks = localStorage.getItem("tasks");
    if (localTasks !== null) {
      tasks = JSON.parse(localTasks);
    }
  }

  list.innerHTML = tasks
    .map((el) => {
      if (el.checkeds) {
        return `
      <div id=${el.id} class="task">
      <div style="background: #ccc " class="blockCheckbox"><input  checked id=${el.id}  type="checkbox" class="checkBox"/></div>
      <div class="solidTask" style="background: #ccc "><p style="text-decoration-line: line-through">${el.newText}</p></div>
      </div>`;
      }
      return `
    <div id=${el.id} class="task">
    <div style="background:${el.color}" class="blockCheckbox"><input id=${el.id}  type="checkbox" class="checkBox"/></div>
    <div class="solidTask" style="background:${el.color}"><p>${el.newText}</p></div>
    </div>`;
    })
    .join("");
  taskList.appendChild(list);
};

renderTaskList();

let collig = document.createElement("div");
collig.classList.add("colors");
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
  if (!td.id) return;
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

collig.innerHTML += '<button class="addTask">Add</button>';
colors.appendChild(collig);

let i = 0;
let checkBox;
function name() {
  let get = localStorage.getItem("tasks");
  if (get) {
    let idLocal = JSON.parse(get);
    idLocal.slice(-1)[0].id + 1;
    i = idLocal.slice(-1)[0].id;
  }
  i++;
}
let addTask = colors.querySelector(".addTask");
addTask.addEventListener("click", (e) => {
  if (textInput.value && idColosdadasd !== 0) {
    name();
    let newTask = {
      id: i,
      color: massivColors[idColosdadasd],
      newText: textInput.value,
      checkeds: false,
    };
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
        target.checked
          ? getTarget(target.id, true)
          : getTarget(target.id, false);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      function getTarget(id, boolem) {
        return tasks.map((elem) => {
          if (elem.id === +id) {
            elem.checkeds = boolem;
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
  }
});
