let grid;
let resolution = 160;
let rows,cols;
function setup(){
  let canvasHeight = window.innerHeight - 100;
  canvasHeight = canvasHeight - canvasHeight%160;
  let canvasWidth = window.innerWidth - window.innerWidth%160;
  let myCanvas = createCanvas(canvasWidth,canvasHeight);
  myCanvas.parent('grid');
  console.log(windowWidth);
  rows = (width)/resolution;
  cols = (height)/resolution;
  grid = makeArray(rows, cols);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = Math.floor(Math.random()*2);
    }
  }
  noLoop();
}
function draw(){
  background(255);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if(grid[i][j]==1){
        fill(0);
        stroke(128);
        rect(i*160,j*160,160-1,160-1);
      }
      else{
        fill(255);
        stroke(128);
        rect(i*160,j*160,160-1,160-1);
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
  document.querySelector('.pause').innerHTML = 'Play';
  clr();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = 0;
    }
  }
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
  noLoop();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = 0;
    }
  }
  document.querySelector('.pause').innerHTML = 'Play';
  draw();
}
function mousePressed(e){
  if(document.querySelector('.pause').innerHTML == 'Pause')
  return;
  let i = Math.floor(e.clientX/160);
  let j = Math.floor(e.clientY/160);
  if(grid[i][j]==1){
    grid[i][j]=0;
    fill(255);
    rect(i*160,j*160,160-1,160-1);
    stroke(128);
  }
  else{
    fill(0);
    rect(i*160,j*160,160-1,160-1);
    stroke(128);
    grid[i][j]=1;
  } 
}