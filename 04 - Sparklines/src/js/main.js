function loadData(){
  //window.localStorage.clear();
  let sparkline = getVal('sparkline');
  if(sparkline.length==0)
  {
    //console.log("hello");
    let box = {
      id: 'pair00',
      from: 'BTC',
      to: 'ETH',
      year: '2021'
    };
    sparkline.unshift(box);
    displayBox(box.id,box.from,box.to,box.year);
    window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  }
  else sparkline.forEach(box=>{
    displayBox(box.id,box.from,box.to,box.year);
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

function invert(node){
  let id = node.parentNode.id;
  var from,to,year;
  let sparkline = getVal('sparkline');
  sparkline.forEach((box)=>{
    if(box.id == id)
    {
      let temp = box.from;
      box.from = box.to;
      box.to = temp;
      from = `${box.from}`;
      to = `${box.to}`;
      year = box.year;
      return;
    }
  })
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  let card = document.getElementById(id);
  card.querySelector('#pair').innerHTML = `${from}/${to}`;
  getData(from,to,year,id);
}
// function temp(data){
//   var rates = [];
//     for (var key in data) {
//       if (!data.hasOwnProperty(key)) continue;
//       rates.push(parseFloat(data[key].Rate));
//   }
//   console.log(rates);
// }

function getData(from,to,year,id) {
  //console.log("first fn");
  let prices = [];
  fetch(`data/${from}/${year}.json`)
    .then((response) => response.json())
    .then((data) => 
    {
      prices = data['prices'];
      return fetch(`data/${to}/${year}.json`)
      .then((response) => response.json())
      .then((data) => getValues(prices,data['prices'],id)); 
    })
}

function getValues(datafrom,datato,id) {
  //console.log('hihhii',datafrom,datato,id);
  var data = [];
  datafrom.forEach((Rate,i) =>{
    let price = datafrom[i]/datato[i];
    if (price < 1)
    price = price.toFixed(1 - Math.floor(Math.log(price) / Math.log(10)));
    else price = price.toFixed(2);
    data.push(price);
  });
  let parent = document.getElementById(id);
  let first = (data[0]),
    last = (data[data.length - 1]);
  let min = (data[0]),
    max = (data[0]);
  data.forEach((Rate, i) => {
    Rate = (Rate);
    if (Rate < min) min = Rate;
    if (Rate > max) max = Rate;
  });
  parent.querySelector('#low').innerHTML = `${min}`;
  parent.querySelector('#high').innerHTML = `${max}`;
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
    
  $(`#${id} .dynamicsparkline`).sparkline(data, {height: 150,width: 250, lineWidth: 1,chartRangeMin: 0});
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

function add(node){
  let from = node.querySelector('#c1').value;
  let to = node.querySelector('#c2').value;
  let year = node.querySelector('#period').value;
  let count = window.localStorage.getItem('count');
  if(count == null)
  count = 0;
  let sparkline = getVal('sparkline');
  let box = {
    id: `pair${count}`,
    from: from,
    to: to,
    year: year
  };
  count++;
  sparkline.push(box);
  console.log(sparkline);
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  window.localStorage.setItem("count", count);
  document.getElementById('addform').style.display = 'none';
  displayBox(box.id,from,to,year);
}

function displayBox(id,from,to,year){
  let boxHTML = 
  `<div class="box" id="${id}">
  <span name="pair" id="pair">${from}/${to}</span>
  <img class="delete" src="img/delete.svg" alt="delete" onclick="remove(this)"></br>
  <img class="invert" src="img/swap.svg" alt="invert" onclick="invert(this)">
  </br>
  <div class="change" id="change">0%</div>
  <div class="lh" id="lh">
      <div class="low"><img class="lhicon" src="img/low.svg" alt=""><span id="low">0</span></div>
      <div class="high"><img class="lhicon" src="img/high.svg" alt=""><span id="high">0</span></div>
  </div>
  <span class="dynamicsparkline"></span>
  <span name="period" id="period">${year}</span>
</div>`;
  let container = document.getElementById('container');
  container.insertAdjacentHTML('afterbegin',boxHTML);
  getData(from,to,year,id);
}