function clear(){
  document.getElementById('fahrenheit').value = '';
  document.getElementById('celsius').value = '';
}
function warning(){
  document.getElementById('warning').innerHTML ='Enter valid value!';
    setTimeout(function(){
      document.getElementById("warning").innerHTML = '';
      },900);
}
function converttoCelsius(){
  var fahrenheit = document.getElementById('fahrenheit').value;
  if(fahrenheit===''||fahrenheit==='-'||fahrenheit==='.')
  {
    document.getElementById('celsius').value = '';
    return;
  }
  if(isNaN(fahrenheit))
  {
    warning();
    clear();
    return;
  }
  var celsius = (fahrenheit - 32)*5/9;
  celsius = celsius.toFixed(2);
  document.getElementById('celsius').value = celsius;
}
function converttoFahrenheit(){
  var celsius = document.getElementById('celsius').value;
  if(celsius===''||celsius==='-'||celsius==='.')
  {
    document.getElementById('fahrenheit').value = '';
    return;
  }
  if(isNaN(celsius))
  {
    warning();
    clear();
    return;
  }
  var fahrenheit = 32 + 9/5*celsius;
  fahrenheit = fahrenheit.toFixed(2);
  document.getElementById('fahrenheit').value = fahrenheit;
}