function loadData(){
  //window.localStorage.clear();
  let sparkline = getVal('sparkline');
  if(sparkline.length==0)
  {
    //console.log("hello");
    let box = {
      id: 'pair00',
      pair: 'BTC-ETH',
      year: '2016'
    };
    sparkline.unshift(box);
    displayBox(box.id,box.pair,box.year);
    window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  }
  else sparkline.forEach(box=>{
    displayBox(box.id,box.pair,box.year);
  });
}

function getVal(item){
  let val = window.localStorage.getItem(item);
  if(val == null)
    return [];
    return JSON.parse(val);
}

function warning(msg) {
  document.getElementById("warning").innerHTML = msg;
  setTimeout(function () {
    document.getElementById("warning").innerHTML = "";
  }, 900);
}

function getData(pair,year,id) {
  //console.log("first fn");
  fetch(`data/${pair}/${year}.json`)
    .then((response) => response.json())
    .then((data) => getValues(data[year],id));
}

function getValues(data,id) {
  let parent = document.getElementById(id);
  let first = parseFloat(data[0].Rate),
    last = parseFloat(data[data.length - 1].Rate);
  let min = parseFloat(data[0].Rate),
    max = parseFloat(data[0].Rate);
  data.forEach((element, i) => {
    element.Rate = parseFloat(element.Rate);
    if (element.Rate < min) min = element.Rate;
    if (element.Rate > max) max = element.Rate;
  });
  parent.querySelector('#low').innerHTML = `$${min}`;
  parent.querySelector('#high').innerHTML = `$${max}`;
  let change = ((last - first) / first) * 100;
  if (Math.abs(change) < 1)
    change = change.toFixed(1 - Math.floor(Math.log(change) / Math.log(10)));
  else change = change.toFixed(2);
  if (change < 0) {
    parent.querySelector(
      "#change"
    ).innerHTML = `<img class="changeid" src="img/down.svg" alt="down" width="20" height="30">${change}%`;
    parent.querySelector("#change").style.color = "red";
  } else {
    parent.querySelector(
      "#change"
    ).innerHTML = `<img class="changeid" src="img/up.svg" alt="up" width="20" height="30">${change}%`;
    parent.querySelector("#change").style.color = "green";
  }

  //Sparkline 
  //fillColor: '' lineColor: ''
    var rates = [];
    for (var key in data) {
      if (!data.hasOwnProperty(key)) continue;
      rates.push(data[key].Rate);
  }
  $(`#${id} .dynamicsparkline`).sparkline(rates, {height: 150,width: 250, lineWidth: 1,chartRangeMin: 0});
}

function remove(node){
  let id = node.parentNode.id;
  let sparkline = getVal('sparkline');
  sparkline.forEach((box,i)=>{
    if(box.id == id)
    {
      sparkline.splice(i,1);
      return;
    }
  })
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  node.parentNode.remove();
}

function displayAdd(){
  document.getElementById('addform').style.display = 'flex';
}

function add(pair,year){
  let count = window.localStorage.getItem('count');
  if(count == null)
  count = 0;
  let sparkline = getVal('sparkline');
  let box = {
    id: `pair${count}`,
    pair: pair,
    year: year
  };
  count++;
  sparkline.push(box);
  console.log(sparkline);
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  window.localStorage.setItem("count", count);
  document.getElementById('addform').style.display = 'none';
  displayBox(box.id,pair,year);
}

function displayBox(id,pair,year){
  let boxHTML = 
  `<div class="box" id="${id}">
  <span name="pair" id="pair">${pair}</span>
  <img class="delete" src="img/delete.svg" alt="delete" onclick="remove(this)">
  </br>
  <div class="change" id="change">0%</div>
  <div class="lh" id="lh">
      <div class="low"><img class="lhicon" src="img/low.svg" alt=""><span id="low">$0</span></div>
      <div class="high"><img class="lhicon" src="img/high.svg" alt=""><span id="high">$0</span></div>
  </div>
  <span class="dynamicsparkline"></span>
  <span name="period" id="period">${year}</span>
</div>`;
  let container = document.getElementById('container');
  container.insertAdjacentHTML('afterbegin',boxHTML);
  getData(pair,year,id);
}