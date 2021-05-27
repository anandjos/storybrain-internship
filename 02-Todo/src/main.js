let todoList = [];
function taskElement(task,id){
    let taskHTML = `<div id=${id}><input type="text" value=${task} readonly><a onclick="edit(this)"><i class="icon-fixed-width icon-pencil icon-2x"></i></a> <a onclick="remove(this)"><i class="icon-fixed-width icon-trash icon-2x"></i></a></br></div>`;
    document.getElementById('list').insertAdjacentHTML('beforeend' ,taskHTML);
}
function add(){
    var task = document.getElementById('task').value;
    document.getElementById('task').value = '';
    if(task==='')
    {
        document.getElementById('warning').innerHTML = "Enter task name!";
        setTimeout(function(){
            document.getElementById("warning").innerHTML = '';
            },900);
        return;
    }
    const todo = {
        id: `task${todoList.length}`,
        task: task,
        isDone: false
    }
    todoList.unshift(todo);
    taskElement(task,todo.id);
}
function remove(temp){
    let id = temp.parentNode.getAttribute('id');
    document.getElementById(id).innerHTML='';
}
function edit(temp){
    let parent = temp.parentNode;
    parent.children[0].readOnly = false;
}