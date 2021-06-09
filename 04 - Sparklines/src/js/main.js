function getData() {
}

function getValues() {
  console.log("hihhihii");
  let year = document.getElementById("period").value;
//console.log(data);
  //     let first = data[i][1];
  let first = 55,
    last = 70,
    min = 30.25,
    max = 85.6;
  //   let min = data[i][1],
  //     max = data[i][1];
  let days = 365;
  if (year % 4 == 0) days = 366;
  //   while (days--) {
  //     if (data[i][1] < min) min = data[i][1];
  //     if (data[i][1] > max) max = data[i][1];
  //   }
  //   let last = data[i-1][1];
  document.getElementById("low").innerHTML = `$${min}`;
  document.getElementById("high").innerHTML = `$${max}`;
  let change = ((last - first) / first) * 100;
  if (Math.abs(change) < 1)
    change = change.toFixed(1 - Math.floor(Math.log(change) / Math.log(10)));
  else change = change.toFixed(2);
  if (change < 0) {
    document.getElementById("change").innerHTML = `<img src="img/down.svg" alt="high" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "red";
  } else {
    document.getElementById("change").innerHTML = `<img src="img/up.svg" alt="high" width="20" height="30">${change}%`;
    document.getElementById("change").style.color = "green";
  }
}
