function getVal(item) {
  const val = window.localStorage.getItem(item);
  if (val == null) return [];
  return JSON.parse(val);
}

function loadStorage() {
  //window.localStorage.clear();
  const todoList = getVal("todo");
  if (todoList.length == 0) {
    window.localStorage.setItem("count", 0);
  } else {
    todoList.forEach((todo) => {
      addTaskElement(todo);
    });
  }
}

function warning(msg) {
  document.getElementById("warning").innerHTML = msg;
  setTimeout(function () {
    document.getElementById("warning").innerHTML = "";
  }, 900);
}

function addTaskElement(todo) {
  const taskHTML = `<div class="todo" id=${todo.id}>
    <input type="checkbox" id="done" onclick="done(this)">
    <textarea class="ele" id="ele" readonly>${todo.task}</textarea>
    <span class="time">${todo.time}</span>
    <a onclick="edit(this)" id="edit"><i id="icon" class="fa fa-pencil-alt"></i></a>
    <a onclick="remove(this)"><i id="icon" class="fa fa-trash"></i></a></br>
    </div>`;
  if (todo.isDone == false)
    document.getElementById("list1").insertAdjacentHTML("afterbegin", taskHTML);
  else {
    document.getElementById("list2").insertAdjacentHTML("beforeend", taskHTML);
    const task = document.getElementById(todo.id);
    task.className = "done";
    task.querySelector("#done").checked = true;
    task.querySelector("#edit").style.display = "none";
  }
}

function add() {
  const taskname = document.getElementById("taskfield").value;
  document.getElementById("taskfield").value = "";
  if (taskname === "") {
    warning("Enter taskname!");
    return;
  }

  let todoList = getVal("todo");
  let count = window.localStorage.getItem("count");
  if (count == null) count = 0;
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();
  const todo = {
    id: `task${count}`,
    task: taskname,
    isDone: false,
    time: time,
  };
  count++;
  todoList.push(todo);
  window.localStorage.setItem("todo", JSON.stringify(todoList));
  window.localStorage.setItem("count", count);
  addTaskElement(todo);
}

function remove(temp) {
  if (window.confirm("Are you sure?")) {
    const id = temp.parentNode.getAttribute("id");
    document.getElementById(id).remove();
    let todoList = getVal("todo");
    todoList.forEach((todo, i) => {
      if (todo.id == id) {
        todoList.splice(i, 1);
        return;
      }
    });
    if (todoList.length == 0) {
      window.localStorage.setItem("count", 0);
    }
    window.localStorage.setItem("todo", JSON.stringify(todoList));
  }
}

function edit(temp) {
  let parent = temp.parentNode;
  let child1 = parent.children[1];
  let child2 = parent.children[3];
  if (child1.readOnly) {
    child1.style.borderColor = "black";
    child1.style.borderStyle = "solid";
    child1.readOnly = false;
    child2.children[0].className = "fa fa-check-circle";
  } else if (child1.value != "") {
    child1.style.borderStyle = "none";
    let todoList = getVal("todo");
    todoList.forEach((todo) => {
      if (todo.id == parent.id) {
        const date = new Date();
        const time = date.getHours() + ":" + date.getMinutes();
        todo.time = time;
        todo.task = child1.value;
        return;
      }
    });
    window.localStorage.setItem("todo", JSON.stringify(todoList));
    child1.readOnly = true;
    child2.children[0].className = "fa fa-pencil-alt";
  } else {
    warning("Task cannot be empty");
  }
}

function done(temp) {
  const parent = temp.parentNode;
  const id = parent.getAttribute("id");
  let todoList = getVal("todo");
  todoList.forEach((todo) => {
    if (todo.id == id) {
      const date = new Date();
      let time = date.getHours() + ":" + date.getMinutes();
      todo.isDone = !todo.isDone;
      todo.time = time;
      return;
    }
  });
  window.localStorage.setItem("todo", JSON.stringify(todoList));
  location.reload();
}

function clr() {
  if (window.confirm("Are you sure?")) {
    window.localStorage.clear();
    location.reload();
  }
}
