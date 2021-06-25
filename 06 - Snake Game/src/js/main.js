let grid;
let resolution = 80;
let rows, cols;
function setup() {
  let canvasHeight = window.innerHeight - 200;
  canvasHeight = canvasHeight - (canvasHeight % 80);
  let canvasWidth = window.innerWidth - (window.innerWidth % 80);
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  myCanvas.parent("grid");
  rows = width / resolution;
  cols = height / resolution;
  grid = makeArray(rows, cols);
}
function draw(){
    background(0);
}
function play(){
}
function makeArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}