let grid;
let resolution = 20;
let rows,cols;
function setup(){
  let myCanvas = createCanvas(600,600);
  myCanvas.parent('grid');
  rows = width/resolution;
  cols = height/resolution;
  grid = makeArray(rows, cols);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = Math.floor(Math.random()*2);
    }
  }
}
function draw(){
  background(0);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if(grid[i][j]==1){
        fill(255);
      stroke(0);
      rect(i*20,j*20,20,20);
      }
    }
  }
  nextState();
}
function makeArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}
function calNeighbors(x,y){
  let i,j,neighbors = 0;
  for(i=x-1;i<x+2;i++){
    if(i<0||i>=grid.length)
    continue;
    for(j=y-1;j<y+2;j++){
      if(j<0||j>=grid[i].length)
      continue;
      if(grid[i][j]==1)
      neighbors++;
    }
  }
  return neighbors-grid[x][y];
}
function nextState(){
  let next = makeArray(rows,cols);
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      let neighbors = calNeighbors(x,y);
      if(grid[x][y]==1){
        if(neighbors<2||neighbors>3)
        next[x][y]=0;
        else next[x][y] = 1;
      }
      else{
        if(neighbors==3)
        next[x][y]=1;
        else next[x][y]=0;
      }
    }
  }
  grid = next; 
}
function start(){
  setup();
  loop();
}
function pause(){
  if(document.querySelector('.pause').innerHTML == 'Pause'){
    noLoop();
    document.querySelector('.pause').innerHTML = 'Play';
  }
  else {
    document.querySelector('.pause').innerHTML = 'Pause';
    loop();
  }
}
function clr(){
  clear();
  document.querySelector('.pause').innerHTML = 'Pause';
}