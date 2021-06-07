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
function display() {
  let transactions = getVal("history");
  if (transactions.length == 0) {
    warning("History is empty");
  } else 
    {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let date = new Date();
      let today = date.getDate() + monthNames[date.getMonth()];
      let year = date.getFullYear();
    let ul = document.getElementById("list");
    transactions.forEach((transaction) => {
      let li = document.createElement("li");
      li.className = 'ele';
      li.innerHTML = `${transaction.amount} ${transaction.from} = ${transaction.result} ${transaction.to}<span id="time">${transaction.date}</span>`;
      if(year==transaction.year && today == transaction.date)
      li.innerHTML = `${transaction.amount} ${transaction.from} = ${transaction.result} ${transaction.to}<span id="time">${transaction.time}</span>`;
      ul.append(li);
    });
  }
}
function clr(){
  if(confirm("Are you sure?")){
    window.localStorage.clear();
    document.getElementById('list').innerHTML = '';
  }
}