let count = window.localStorage.getItem('count');
let todoList = JSON.parse(window.localStorage.getItem('todo'));
if(todoList==null){
    todoList = [];
    window.localStorage.setItem('count', 0);
}
function loadStorage(){
    //window.localStorage.clear();
    if(localStorage.getItem('count')==null)
    {
        count = 0;
        window.localStorage.setItem('count', 0);
    }
    todoList.forEach(todo=>{
        if(todo.isDone==false)
            addTaskElement(todo.task,todo.id,todo.time);
        else addTaskElement2(todo.task,todo.id);
    });
}
function exists(taskname){
    let exist = false;
    todoList.forEach(todo=>{
        if(todo.task==taskname){
            exist = true;
            return;
        }
    });
    return exist;
}
function warning(msg){
    document.getElementById('warning').innerHTML = msg;
        setTimeout(function(){
            document.getElementById("warning").innerHTML = '';
            },900);
}
function addTaskElement(task,id,time){
    let taskHTML = `<div id=${id}><input type="checkbox" id="done" onclick="done(this)"><input type="text" class="ele" value="${task}" readonly>
    <p class="time">${time}</p>
    <a onclick="edit(this)"><i class="icon-fixed-width icon-pencil icon-2x"></i></a> 
    <a onclick="remove(this)"><i class="icon-fixed-width icon-trash icon-2x"></i></a></br></div>`;
    document.getElementById('list1').insertAdjacentHTML('afterbegin' ,taskHTML);
}
function addTaskElement2(task,id){
    let taskHTML = `<div id=${id}><input type="text" class="ele" value="${task}" readonly> 
    <a onclick="remove(this)"><i class="icon-fixed-width icon-trash icon-2x"></i></a></br></div>`;
    document.getElementById('list2').insertAdjacentHTML('beforeend' ,taskHTML);
}
function add(){
    var taskname = document.getElementById('task').value;
    document.getElementById('task').value = '';
    if(taskname==='')
    {
        warning("Enter taskname!");
        return;
    }
    const date = new Date();
    var time = date.getHours() + ':' + date.getMinutes();
    /*if(exists(taskname)){
        warning("Task already exists!");
        return;
    }*/
    const todo = {
        id: `task${count}`,
        task: taskname,
        isDone: false,
        time: time
    }
    count++;
    window.localStorage.setItem('count', count);
    todoList.push(todo);
    window.localStorage.setItem('todo', JSON.stringify(todoList));
    addTaskElement(taskname,todo.id,todo.time);
    console.log(todoList);
}
function remove(temp){
    if(window.confirm("Are you sure?")){
        let id = temp.parentNode.getAttribute('id');
        document.getElementById(id).innerHTML='';
        todoList.forEach((todo,i)=>{
            if(todo.id==id){
                todoList.splice(i,1);
                return;
            }
        });  
        window.localStorage.setItem('todo', JSON.stringify(todoList));
    }
}
function edit(temp){
    let parent = temp.parentNode;
    let child1 = parent.children[1];
    let child2 = parent.children[2];
    if(child1.readOnly){
        child1.style.borderColor = "black";
        child1.style.borderStyle = "solid";
        child1.readOnly = false;
        child2.children[0].className = "icon-li icon-ok icon-2x";
    }
    else if(child1.value != ''){
        child1.style.borderColor = "white";
        child1.style.borderStyle = "none"
        todoList.forEach(todo=>{
            if(todo.id == parent.id)
            {
                let date = new Date();
                let time = date.getHours() + ':' + date.getMinutes();
                todo.time = time;
                todo.task = child1.value;
                return;
            }
        });
        window.localStorage.setItem('todo', JSON.stringify(todoList));
        child1.readOnly = true;
        child2.children[0].className = "icon-fixed-width icon-pencil icon-2x";
    }
    else{
        warning("Task cannot be empty");
    }
}
function done(temp){
    let parent = temp.parentNode;
    let id = parent.getAttribute('id');
    todoList.forEach(todo=>{
        if(todo.id==id){
            todo.isDone = !todo.isDone;
            return;
        }
    });
    window.localStorage.setItem('todo', JSON.stringify(todoList));
    location.reload();
}