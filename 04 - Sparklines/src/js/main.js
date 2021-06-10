function getData() {
  //console.log("first fn");
  let year = document.getElementById("period").value;
  fetch(`data/${year}.json`)
    .then((response) => response.json())
    .then((data) => getValues(data[year]));
}

function getValues(data) {
  let first = parseFloat(data[0].Rate),
    last = parseFloat(data[data.length - 1].Rate);
  let min = parseFloat(data[0].Rate),
    max = parseFloat(data[0].Rate);
  //console.log(min);
  data.forEach((element, i) => {
    element.Rate = parseFloat(element.Rate);
    if (element.Rate < min) min = element.Rate;
    if (element.Rate > max) max = element.Rate;
  });
  document.getElementById("low").innerHTML = `$${min}`;
  document.getElementById("high").innerHTML = `$${max}`;
  let change = ((last - first) / first) * 100;
  if (Math.abs(change) < 1)
    change = change.toFixed(1 - Math.floor(Math.log(change) / Math.log(10)));
  else change = change.toFixed(2);
  if (change < 0) {
    document.getElementById(
      "change"
    ).innerHTML = `<img class="changeid" src="img/down.svg" alt="down" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "red";
  } else {
    document.getElementById(
      "change"
    ).innerHTML = `<img class="changeid" src="img/up.svg" alt="up" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "green";
  }

  //Sparkline 
  //fillColor: '' lineColor: ''
    var rates = [];
    for (var key in data) {
      if (!data.hasOwnProperty(key)) continue;
      rates.push(data[key].Rate);
  }
  $('.dynamicsparkline').sparkline(rates, {height: 150,width: 250, lineWidth: 1,chartRangeMin: 0});
}
