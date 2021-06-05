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
    let ul = document.getElementById("list");
    transactions.forEach((transaction) => {
      let li = document.createElement("li");
      li.className = 'ele';
      li.innerHTML = `<span class="time">${transaction.timestamp}</span>  ${transaction.amount} ${transaction.from} = ${transaction.result} ${transaction.to}`;
      ul.append(li);
    });
  }
}
