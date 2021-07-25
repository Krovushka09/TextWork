var span=document.getElementById('DecryptionSpan');
var input=document.getElementById('DecryptionInput');
var textmain=document.getElementById('Text-Work-main');//ссылка на весь контейнер
var textcontainerwork=document.getElementById('text-work-vocabulary-container');
//var buttonAddPair=document.getElementById('text-work-vocabulary-container');
var buttonAdd=document.getElementById('add-button');//сслыка для кнокпи "добавить"
var closingСross=document.getElementById('CloseFormForAdd');//ссылка на крестик, который закрывает форму добавления слова
var checkAdding=document.getElementById('AddWordInVocabulary');//ссылка на галочку, которая добавляет новый элемент всловарь 
console.log(checkAdding);
var iterator=0;
var spanToInput=function(){//
  span.style.display='none';
  input.style.display='inline';
}
var inputToSpan=function(event){
  if(event.target.id!=="DecryptionInput"&& event.target.id!=="DecryptionSpan"){
    span.style.display='inline';
    input.style.display='none';
  }
}
var addpair=function(){
  const id = iterator++;
  var pair= document.createElement('div');
  pair.className = "Textvocabulary";
  pair.id="MyVocabularyText";
  pair.innerHTML =`<span class="Text-Work-decryption" id="DecryptionSpan-${id}">Купи-пива! и Сухари</span> <input type="text" id="DecryptionInput-${id}" style="display:none;" value="Купи-пива!"/>`;
  debugger
  textcontainerwork.append(div);
}
var openFormForAdd=function () {
  OpenAdd.style.display = "inline";
  buttonAdd.style.display="none";
}
var closeFormForAdd=function(){
  OpenAdd.style.display ="none"; 
  buttonAdd.style.display="inline";
}
span.addEventListener('click',spanToInput);
textmain.addEventListener('click',inputToSpan);
buttonAdd.addEventListener('click',openFormForAdd);
closingСross.addEventListener('click',closeFormForAdd);
checkAdding.addEventListener('click',addpair);
