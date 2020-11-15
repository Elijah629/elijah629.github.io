function Codecheck1(){
  var textarea = document.getElementById('textareabox');

  var code1 = 'HGf20LGh';

  var textValue=textarea.value;

  if (textValue.indexOf(code1)!=-1)
  {
    alert('CODE ENTERD Click OK to transport')
Code1tp()
  }
}
function Code1tp() {
  location.href='../SecretCodeSecrets/Code1/index.html'
}
//----------------------------------------------------//
function Codecheck2(){
  var textarea = document.getElementById('textareabox');

  var code2 = 'You Shall Not Pass!';

  var textValue=textarea.value;

  if (textValue.indexOf(code2)!=-1)
  {
    alert('CODE ENTERD Click OK to transport')
Code2tp()
  }
}
function Code2tp() {
  location.href='../SecretCodeSecrets/Code2/index.html'
}
