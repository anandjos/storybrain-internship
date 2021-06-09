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
    ).innerHTML = `<img src="img/down.svg" alt="high" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "red";
  } else {
    document.getElementById(
      "change"
    ).innerHTML = `<img src="img/up.svg" alt="high" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "green";
  }
}
