function Ps1Check()
{
  var textarea = document.getElementById('Password');

  var ps1 = 'The Password';

  var textValue=textarea.value;

  if (textValue.indexOf(ps1)!=-1)
  {
    alert('lol u found it')
    PSE()
  }
}
function PSE()
{
  console.log('WARNING YOU NEED WEBGl');

  alert('LOADING WEBGL...');

  alert('Loaded');

  location.href='index2.html'

}
