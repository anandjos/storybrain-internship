let lp = true;
const res = 10;
let xCor;
let yCor;
let foodCor = [res*10,res*20];
let appleCount = 0;
let direction;
function setup() {
  let canvasHeight = window.innerHeight - 220;
  canvasHeight = canvasHeight - (canvasHeight % 20);
  let canvasWidth = window.innerWidth - (window.innerWidth % 20);
  if(canvasWidth>900)
  canvasWidth = 900;
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  myCanvas.parent("canvas");
  xCor = [res * 5, res * 6,res*7,res*8,res*9,res*10];
  yCor = [res * 5, res * 5,res*5,res*5,res*5,res*5];
  direction='right';
}
function draw() {
  background(0);
  frameRate(10);
    strokeWeight(10);
  //moveSnake();
  for (i = 0; i < xCor.length - 1; i++) {
    stroke(255);
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  stroke('grey');
  strokeWeight(15);
  point(xCor[i],yCor[i]);
  stroke(255,0,0);
  strokeWeight(10);
  point(foodCor[0],foodCor[1]);
  moveSnake();
  checkSnakeCollission();
  checkFood();
  //noLoop();
}
function moveSnake() {
  let x=0,y=0;
  if(direction=='right'){
    x=1;
  }
  else if(direction=='down'){
    y=1;
  }
  else if(direction=='left'){
    x=-1;
  }
  else if(direction=='up'){
    y=-1;
  }
  x = xCor[xCor.length-1] + res * x;
  y = yCor[yCor.length-1] + res * y;
  if(x<0||y<0||x>width-res||y>height-res)
  {
    noLoop();
    lp = false;
    document.getElementById('score').innerHTML=`GAME OVER! SCORE :${appleCount}`;
  }
  else{
    xCor.push(x);
  yCor.push(y);
  let c = checkFood();
  if(c){
    xCor.splice(0,1);
  yCor.splice(0,1);
  document.getElementById('score').innerHTML=`SCORE :${appleCount}`;
  }
  }
}
function checkSnakeCollission(){
  const xHead = xCor[xCor.length-1];
  const yHead = yCor[yCor.length-1];
  for(let i=0;i<xCor.length-1;i++){
    if(xCor[i]==xHead&&yCor[i]==yHead){
      noLoop();
    lp = false;
    document.getElementById('score').innerHTML=`GAME OVER! SCORE :${appleCount}`;
    }
  }
}
function checkFood(){
  if(foodCor[0]==xCor[xCor.length-1]&&foodCor[1]==yCor[yCor.length-1]){
    appleCount+=10;
    appleRandom();
    return 0;
  }
  return 1;
}
function appleRandom() {
  let x = 10*Math.floor(Math.random() * (width/10 - 2) + 1);
  let y = 10*Math.floor(Math.random() * (height/10 - 2) + 1);
  foodCor = [x,y];
  stroke(255,0,0);
  point(x, y);
}
function play() {
  setup();
  appleCount=0;
  document.getElementById('score').innerHTML=`SCORE :${appleCount}`;
  lp = true;
  loop();
}
function stop() {
  if(lp){
    noLoop();
    lp = false;
  }
  else {
    loop();
    lp = true;
  }
}
function move(node) {
  const dir = node.className;
  if (dir == "up") {
    if (direction != "down") direction = dir;
  } else if (dir == "right") {
    if (direction != "left") direction = dir;
  } else if (dir == "down") {
    if (direction != "up") direction = dir;
  }
  else if (dir == "left") {
    if (direction != "right") direction = dir;
  }
}
