function loadData() {
  //window.localStorage.clear();
  let sparkline = getVal("sparkline");
  if (sparkline.length == 0) {
    const box = {
      id: "pair00",
      from: "BTC",
      to: "ETH",
      year: "2021",
    };
    sparkline.unshift(box);
    displayBox(box.id, box.from, box.to, box.year);
    window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  } else
    sparkline.forEach((box) => {
      displayBox(box.id, box.from, box.to, box.year);
    });
}

function getVal(item) {
  let val = window.localStorage.getItem(item);
  if (val == null) return [];
  return JSON.parse(val);
}

function warning(msg) {
  document.getElementById("warning").innerHTML = msg;
  setTimeout(function () {
    document.getElementById("warning").innerHTML = "";
  }, 900);
}

function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 4; i++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
}

function invert(node) {
  const id = node.parentNode.id;
  let from, to, year;
  let sparkline = getVal("sparkline");
  sparkline.forEach((box) => {
    if (box.id == id) {
      let temp = box.from;
      box.from = box.to;
      box.to = temp;
      from = box.from;
      to = box.to;
      year = box.year;
      return;
    }
  });
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  let card = document.getElementById(id);
  card.querySelector("#pair").innerHTML = `${from}/${to}`;
  getData(from, to, year, id);
}

function change(node) {
  const id = node.parentNode.id;
  let from, to, year;
  year = node.value;
  let sparkline = getVal("sparkline");
  sparkline.forEach((box) => {
    if (box.id == id) {
      from = box.from;
      to = box.to;
      box.year = year;
      return;
    }
  });
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  let card = document.getElementById(id);
  getData(from, to, year, id);
}

// async function progress(){
//   let current_progress = 0,step = 0.5;
//     interval = setInterval(function() {
//         current_progress += step;
//         progress = Math.round(Math.atan(current_progress) / (Math.PI / 2) * 100 * 1000) / 1000
//         $(`#${id} progress`)
//             .attr("value", progress);
//         if (progress >= 100){
//             clearInterval(interval);
//         }else if(progress >= 70) {
//             step = 0.1
//         }
//     }, 100);
// }

function progress(id) {
  let i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById(id);
    var width = 1;
    var id = setInterval(frame, 8);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.querySelector('progress').value = width;
      }
    }
  }
}

function getData(from, to, year, id) {
  //console.log("first fn");
  document.getElementById(id).querySelector('progress').value = "0";
  document.getElementById(id).querySelector('progress').style.display = 'inline';
  progress(id);
  let prices = [];
  fetch(`data/${from}/${year}.json`)
    .then((response) => response.json())
    .then((data) => {
      prices = data["prices"];
      return fetch(`data/${to}/${year}.json`)
        .then((response) => response.json())
        .then((data) => getValues(prices, data["prices"], id));
    });
}

function getValues(datafrom, datato, id) {
  const parent = document.getElementById(id);
  let data = [];
  datafrom.forEach((Rate, i) => {
    let price = datafrom[i] / datato[i];
    if (price < 1)
      price = price.toFixed(1 - Math.floor(Math.log(price) / Math.log(10)));
    else price = price.toFixed(2);
    data.push(parseFloat(price));
  });
  let first = data[0],
    last = data[data.length - 1];
  let min = data[0],
    max = data[0];
  data.forEach((Rate, i) => {
    if (Rate < min) min = Rate;
    if (Rate > max) max = Rate;
  });
  parent.querySelector("#low").innerHTML = `${min}`;
  parent.querySelector("#high").innerHTML = `${max}`;
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
  $(`#${id} .dynamicsparkline`).sparkline(data, {
    height: 150,
    width: 250,
    lineWidth: 1,
    chartRangeMin: 0,
  });
  parent.querySelector('progress').style.display = 'none';
}

function remove(node) {
  if (window.confirm("Are you sure?")) {
    let id = node.parentNode.id;
    let sparkline = getVal("sparkline");
    sparkline.forEach((box, i) => {
      if (box.id == id) {
        sparkline.splice(i, 1);
        return;
      }
    });
    window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
    node.parentNode.remove();
  }
}

function displayAdd() {
  document.getElementById("addform").style.display = "flex";
}

function add(node) {
  let from = node.querySelector("#c1").value;
  let to = node.querySelector("#c2").value;
  let year = node.querySelector("#period").value;
  let sparkline = getVal("sparkline");
  let box = {
    id: makeid(),
    from: from,
    to: to,
    year: year,
  };
  sparkline.push(box);
  //console.log(sparkline);
  window.localStorage.setItem("sparkline", JSON.stringify(sparkline));
  document.getElementById("addform").style.display = "none";
  displayBox(box.id, from, to, year);
}

function displayBox(id, from, to, year) {
  let boxHTML = `<div class="box" id="${id}">
  <span name="pair" id="pair">${from}/${to}</span>
  <img class="delete" src="img/delete.svg" alt="delete" onclick="remove(this)"></br>
  <img class="invert" src="img/swap.svg" alt="invert" onclick="invert(this)">
  </br>
  <progress value="0" max="100"></progress></br>
  <div class="change" id="change">0%</div>
  <div class="lh" id="lh">
      <div class="low"><img class="lhicon" src="img/low.svg" alt=""><span id="low">0</span></div>
      <div class="high"><img class="lhicon" src="img/high.svg" alt=""><span id="high">0</span></div>
  </div>
  <span class="dynamicsparkline"></span>
  <select name="period" id="period" onchange="change(this)">
  <option value="2019">2019</option>
  <option value="2020">2020</option>
  <option value="2021">2021</option>
  </select>
</div>`;
  let container = document.getElementById("container");
  container.insertAdjacentHTML("afterbegin", boxHTML);
  document.getElementById(id).querySelector("#period").value = year;
  getData(from, to, year, id);
}
