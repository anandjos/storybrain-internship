const API_KEY = "d30cebc25af4f2f66c7d0fb4dd01ffd7";
let rates = {
  AED: 4.483475,
  AFN: 96.271625,
  ALL: 123.134411,
  AMD: 635.657861,
  ANG: 2.191642,
  AOA: 783.667773,
  ARS: 115.553976,
  AUD: 1.578413,
  AWG: 2.198419,
  AZN: 2.077868,
  BAM: 1.953703,
  BBD: 2.465285,
  BDT: 103.533867,
  BGN: 1.952285,
  BHD: 0.460146,
  BIF: 2413.832478,
  BMD: 1.220666,
  BND: 1.614995,
  BOB: 8.418733,
  BRL: 6.288379,
  BSD: 1.220956,
  BTC: 0.000033078654,
  BTN: 89.026064,
  BWP: 12.982045,
  BYN: 3.095604,
  BYR: 23925.051115,
  BZD: 2.46113,
  CAD: 1.47407,
  CDF: 2438.890554,
  CHF: 1.0965,
  CLF: 0.032227,
  CLP: 889.251023,
  CNY: 7.79993,
  COP: 4475.327291,
  CRC: 754.752347,
  CUC: 1.220666,
  CUP: 32.347646,
  CVE: 110.145068,
  CZK: 25.426164,
  DJF: 217.360655,
  DKK: 7.436773,
  DOP: 69.453556,
  DZD: 162.719787,
  EGP: 19.14251,
  ERN: 18.312417,
  ETB: 53.192227,
  EUR: 1,
  FJD: 2.475571,
  FKP: 0.868522,
  GBP: 0.862864,
  GEL: 3.979347,
  GGP: 0.868522,
  GHS: 7.069502,
  GIP: 0.868522,
  GMD: 62.437446,
  GNF: 11974.518156,
  GTQ: 9.435226,
  GYD: 255.312003,
  HKD: 9.471336,
  HNL: 29.357306,
  HRK: 7.506485,
  HTG: 109.271886,
  HUF: 346.273599,
  IDR: 17439.775397,
  ILS: 3.962617,
  IMP: 0.868522,
  INR: 89.300864,
  IQD: 1781.427583,
  IRR: 51396.136384,
  ISK: 147.054073,
  JEP: 0.868522,
  JMD: 182.056547,
  JOD: 0.865447,
  JPY: 133.988814,
  KES: 131.526693,
  KGS: 102.9899,
  KHR: 4971.743943,
  KMF: 491.50097,
  KPW: 1098.599429,
  KRW: 1358.747953,
  KWD: 0.36718,
  KYD: 1.017496,
  KZT: 522.593113,
  LAK: 11527.301236,
  LBP: 1841.280031,
  LKR: 241.146614,
  LRD: 209.282829,
  LSL: 16.783687,
  LTL: 3.604309,
  LVL: 0.738368,
  LYD: 5.436913,
  MAD: 10.774268,
  MDL: 21.513698,
  MGA: 4588.201356,
  MKD: 61.547983,
  MMK: 2009.725806,
  MNT: 3480.012324,
  MOP: 9.758414,
  MRO: 435.777507,
  MUR: 49.683615,
  MVR: 18.871954,
  MWK: 973.715835,
  MXN: 24.388721,
  MYR: 5.040496,
  MZN: 74.588777,
  NAD: 16.783627,
  NGN: 501.217459,
  NIO: 42.642346,
  NOK: 10.153737,
  NPR: 142.437822,
  NZD: 1.688171,
  OMR: 0.469955,
  PAB: 1.220971,
  PEN: 4.681522,
  PGK: 4.341948,
  PHP: 58.391167,
  PKR: 189.464097,
  PLN: 4.461144,
  PYG: 8263.00126,
  QAR: 4.444441,
  RON: 4.918306,
  RSD: 117.477565,
  RUB: 89.886782,
  RWF: 1223.517675,
  SAR: 4.577897,
  SBD: 9.738099,
  SCR: 20.138313,
  SDG: 516.341717,
  SEK: 10.102737,
  SGD: 1.616235,
  SHP: 0.868522,
  SLL: 12487.411713,
  SOS: 714.089261,
  SRD: 17.277298,
  STD: 25311.464504,
  SVC: 10.683411,
  SYP: 1535.030386,
  SZL: 16.823213,
  THB: 38.024974,
  TJS: 13.925437,
  TMT: 4.284537,
  TND: 3.331809,
  TOP: 2.707497,
  TRY: 10.529305,
  TTD: 8.169638,
  TWD: 33.781685,
  USD: 1.02345,
  YER: 305.166563,
  ZAR: 16.828411,
  ZMK: 10987.458071,
  ZMW: 27.515153,
  ZWL: 393.054783,
};
//let rates = {};
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

function display() {
  //window.localStorage.clear();
  let transactions = getVal('history');
  if (transactions.length == 0) {
    console.log("empty");
  } 
  else {
    transactions.forEach((transaction) => {
      
    });
  }
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
  let timestamp = new Date();
  let transaction = {
    timestamp: timestamp,
    amount: amount,
    from: from,
    to: to,
    result: result
  };
  history.push(transaction);
  console.log(history);
  window.localStorage.setItem("history", JSON.stringify(history));
}

function convert() {
  var from = document.getElementById("fromCur").value;
  var to = document.getElementById("toCur").value;
  let amount = document.getElementById("value").value;
  if (isNaN(amount) || amount =='') {
    document.getElementById('result').innerHTML = '';
    warning("Enter amount correctly!");
    document.getElementById("value").value = '';
    return;
  }
  let x = rates[to] / rates[from];
  let result = (x * amount).toFixed(2);
  document.getElementById("result").innerHTML = `<p> ${result} ${to}</p>`;
  addToLog(amount,from,to,result);  
}