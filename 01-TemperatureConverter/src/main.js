function converttoCelsius(){
  var fahrenheit = document.getElementById('fahrenheit').value;
  if(fahrenheit==='')
  {
    document.getElementById('celsius').value = '';
    return;
  }
  if(isNaN(fahrenheit))
  {
    alert('Enter valid value');
    return;
  }
  var celsius = (fahrenheit - 32)*5/9;
  celsius = celsius.toFixed(2);
  document.getElementById('celsius').value = celsius;
}
function converttoFahrenheit(){
  var celsius = document.getElementById('celsius').value;
  if(celsius==='')
  {
    document.getElementById('fahrenheit').value = '';
    return;
  }
  if(isNaN(celsius))
  {
    alert('Enter valid value');
    return;
  }
  var fahrenheit = 32 + 9/5*celsius;
  fahrenheit = fahrenheit.toFixed(2);
  document.getElementById('fahrenheit').value = fahrenheit;
}