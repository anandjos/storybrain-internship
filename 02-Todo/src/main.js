let todo = [];
function clear(){
    document.getElementById('task').value ='';
    document.getElementById('newtask').value ='';
}
function displayAdd() {
    var x = document.getElementById("form");
    x.style.display = "block";
    document.getElementById('newtask').style.display = "none";
    document.getElementById('list').style.display = "none";
    document.getElementById('action').innerHTML = 'ADD';
}
function displayEdit() {
    var x = document.getElementById("form");
    x.style.display = "block";
    document.getElementById('newtask').style.display = "block";
    document.getElementById('list').style.display = "none";
    document.getElementById('action').innerHTML = 'EDIT';
}
function displayRemove() {
    var x = document.getElementById("form");
    x.style.display = "block";
    document.getElementById('newtask').style.display = "none";
    document.getElementById('list').style.display = "none";
    document.getElementById('action').innerHTML = 'REMOVE';
}
function add(){
    var task = document.getElementById('task').value;
    if(task==='')
    {
        alert('task cant be empty');
        return;
    }
    todo.push(task);
    clear();
}
function edit(){
    var task = document.getElementById('task').value;
    let pos = todo.indexOf(task);
    var newtask = document.getElementById('newtask').value;
    let pos2 = todo.indexOf(newtask);
    if(pos===-1 ||pos2!==-1)
    {
        clear();
        alert("error");
        return;
    }
    todo[pos] = newtask;
    clear();
}
function remove(){
    document.getElementById('newtask').style.display = "none";
    var task = document.getElementById('task').value;
    let pos = todo.indexOf(task);
    if(pos===-1){
        clear();
        alert("no such task");
        return;
    }
    todo.splice(pos,1);
    clear();
}
function view(){
    document.getElementById('form').style.display = "none";
    document.getElementById('list').style.display = "block";
    document.getElementById('list').innerHTML = '';
    todo.forEach(ele=>{
        document.getElementById('list').innerHTML += ele + '</br>'; 
    })
}
function action(){
    if(document.getElementById('action').innerHTML == 'ADD')
    add();
    else if(document.getElementById('action').innerHTML == 'EDIT')
    edit();
    else if(document.getElementById('action').innerHTML == 'REMOVE')
    remove();
}