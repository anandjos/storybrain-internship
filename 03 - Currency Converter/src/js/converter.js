const API_KEY = "d30cebc25af4f2f66c7d0fb4dd01ffd7";
let rates = {};
function loadValues(){
  let history = getVal('history');
  if(history.length!=0){
    let transaction = history[0];
    document.getElementById('fromCur').value = transaction.from;
    document.getElementById('toCur').value = transaction.to;
    document.getElementById('value').value = transaction.amount;
    document.getElementById('result').value = transaction.result;
  }
}

function pollapi() {
  getRates();
  setInterval(getRates, 1000 * 20 * 60);
}

function getRates() {
  const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      // by default the response comes in the string format, we need to parse the data into JSON
      let data = JSON.parse(request.response);
      rates = data.rates;
      console.log(rates);
    } else {
      console.log(`error ${request.status} ${request.statusText}`);
    }
  };
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

function addToLog(amount,from,to,result){
  //window.localStorage.clear();
  let history = getVal('history');
  let date = new Date();
  let timestamp = date.getDate()+
  "/"+(date.getMonth()+1)+
  "/"+date.getFullYear()+
  " "+date.getHours()+
  ":"+date.getMinutes()+
  ":"+date.getSeconds();
  let transaction = {
    timestamp: timestamp,
    amount: amount,
    from: from,
    to: to,
    result: result
  };
  history.unshift(transaction);
  console.log(history);
  window.localStorage.setItem("history", JSON.stringify(history));
}

function convert() {
  var from = document.getElementById("fromCur").value;
  var to = document.getElementById("toCur").value;
  let amount = document.getElementById("value").value;
  if (isNaN(amount) || amount =='') {
    document.getElementById('result').value = '';
    warning("Enter amount correctly!");
    document.getElementById("value").value = '';
    return;
  }
  let x = rates[to] / rates[from];
  let result = (x * amount);
  if(result<1)
  result = result.toFixed(1-Math.floor(Math.log(result)/Math.log(10)));
  else result = result.toFixed(2);
  document.getElementById("result").value = result;
  addToLog(amount,from,to,result);  
}
function exchange(){
  let temp = document.getElementById('fromCur').value;
  document.getElementById('fromCur').value = document.getElementById('toCur').value;
  document.getElementById('toCur').value = temp;
}