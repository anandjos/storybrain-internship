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
function clr() {
  if (confirm("Are you sure?")) {
    window.localStorage.clear();
    document.getElementById("list").innerHTML = "";
  }
}
function getScores() {
  let scores = getVal("scores");
  if (scores.length == 0) {
    warning("History is empty");
  } else {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let ul = document.getElementById("list");
    scores.forEach((score,i) => {
      let date = new Date();
      let today = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let time = score.time;
      let scoreDay = score.today;
      let scoreMonth = score.month;
      let scoreYear = score.year;
      let li = document.createElement("li");
      li.className = "ele";
      if (scoreYear != year)
        li.innerHTML = `${i+1}.Score = ${score.score}<span id="time">${scoreDay}/${scoreMonth}/${scoreYear}</span>`;
      else {
        if (today == scoreDay && month == scoreMonth)
          li.innerHTML = `${i+1}.Score = ${score.score}<span id="time">${time}</span>`;
        else
          li.innerHTML = `${i+1}.Score = ${score.score}<span id="time">${scoreDay} ${monthNames[scoreMonth]}</span>`;
      }

      ul.append(li);
    });
  }
}
