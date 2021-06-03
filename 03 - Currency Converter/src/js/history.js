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
    let date = document.getElementById("date");
    let amount = document.getElementById("amount");
    let result = document.getElementById("result");
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    transactions.forEach((transaction) => {
      let li1 = document.createElement("li");
      let li2 = document.createElement("li");
      let li3 = document.createElement("li");
      let li4 = document.createElement("li");
      let li5 = document.createElement("li");
      li5.innerHTML = `${transaction.result}`;
      result.append(li5);
      li1.innerHTML = `${transaction.timestamp}`;
      date.append(li1);
      li2.innerHTML = `${transaction.amount}`;
      amount.append(li2);
      li3.innerHTML = `${transaction.from}`;
      from.append(li3);
      li4.innerHTML = `${transaction.to}`;
      to.append(li4);
    });
  }
}
