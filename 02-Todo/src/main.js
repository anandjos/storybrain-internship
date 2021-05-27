let todoList = [];
let count = 0;
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
function addTaskElement(task,id){
    let taskHTML = `<div id=${id}><input type="text" class="ele" value="${task}" readonly><a onclick="edit(this)"><i class="icon-fixed-width icon-pencil icon-2x"></i></a> <a onclick="remove(this)"><i class="icon-fixed-width icon-trash icon-2x"></i></a></br></div>`;
    document.getElementById('list').insertAdjacentHTML('beforeend' ,taskHTML);
}
function add(){
    var taskname = document.getElementById('task').value;
    document.getElementById('task').value = '';
    if(taskname==='')
    {
        warning("Enter taskname!");
        return;
    }
    /*if(exists(taskname)){
        warning("Task already exists!");
        return;
    }*/
    const todo = {
        id: `task${count}`,
        task: taskname,
        isDone: false
    }
    count++;
    todoList.unshift(todo);
    addTaskElement(taskname,todo.id);
}
function remove(temp){
    let id = temp.parentNode.getAttribute('id');
    document.getElementById(id).innerHTML='';
    todoList.forEach((todo,i)=>{
        if(todo.id==id){
            todoList.splice(i,1);
            return;
        }
    });  
}
function edit(temp){
    let parent = temp.parentNode;
    let child1 = parent.children[0];
    let child2 = parent.children[1];
    if(child1.readOnly){
        child1.style.borderColor = "black";
        child1.readOnly = false;
        child2.children[0].className = "icon-li icon-ok icon-2x";
    }
    else{
        child1.style.borderColor = "white";
        todoList.forEach(todo=>{
            if(todo.id == parent.id)
            {
                todo.task = child1.value;
                return;
            }
        });
        child1.readOnly = true;
        child2.children[0].className = "icon-fixed-width icon-pencil icon-2x";
    }
}