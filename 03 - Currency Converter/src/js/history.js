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
      li.innerHTML = `${transaction.amount} ${transaction.from} = ${transaction.result} ${transaction.to}<span class="time">${transaction.timestamp}</span>`;
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