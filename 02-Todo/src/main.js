let todoList = [];
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
        id: `task${todoList.length}`,
        task: taskname,
        isDone: false
    }
    todoList.unshift(todo);
    addTaskElement(taskname,todo.id);
}
function remove(temp){
    let id = temp.parentNode.getAttribute('id');
    document.getElementById(id).innerHTML='';
}
function edit(temp){
    let parent = temp.parentNode;
    let child1 = parent.children[0];
    let child2 = parent.children[1];
    if(child1.readOnly){
        child1.readOnly = false;
        child2.innerHTML = `<a onclick="edit(this)"><i class="icon-li icon-ok icon-2x"></i></a>`;
    }
    else{
        /*'<a><i class="icon-li icon-ok">'*/
        child1.readOnly = true;
        child2.innerHTML = `<a onclick="edit(this)"><i class="icon-fixed-width icon-pencil icon-2x"></i></a>`;
    }
}