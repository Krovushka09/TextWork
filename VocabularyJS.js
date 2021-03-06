var span = document.getElementById('Text-Word-DecryptionSpan');
var input = document.getElementById('Text-Word-DecryptionInput');
var textmain = document.getElementById('Text-Work-main');//ссылка на весь контейнер
var textcontainerwork = document.getElementById('text-work-vocabulary-container');
var buttonAdd = document.getElementById('add-button');//сслыка для кнокпи "добавить"
var closingСross = document.getElementById('CloseFormForAdd');//ссылка на крестик, который закрывает форму добавления слова
var checkAdding = document.getElementById('AddWordInVocabulary');//ссылка на галочку, которая добавляет новый элемент всловарь 
var newSpanInForm = document.getElementsByClassName('Text-Work-decryption');
var activeInput;
var iterator=0;
var closeTextWork=function(event){//закрыть окно словарz
  newSpanInForm= event.target.id;
  console.log(newSpanInForm);
}
var spanToInput = function(event) {
  let currentId;
  if (event.target.id.startsWith('DecryptionSpan')){
    let span = document.getElementById(event.target.id);
    let newId = event.target.id.split('-')[1];
    if(newId !== currentId){
      inputToSpan(null, true);
    }
    let input = document.getElementById(`DecryptionInput-${newId}`);
    activeInput=input;
    currentId=newId;
    span.style.display='none';
    input.style.display='inline';
    saveValue(newId, activeInput.value);
  }
}
var inputToSpan = function(event, force) {
  if((activeInput &&(force||(!force && !event.target.id.startsWith('DecryptionSpan') && !event.target.id.startsWith('DecryptionInput'))))){
    activeInput.style.display='none';
    let id= activeInput.id.split('-')[1];
    let span = document.getElementById(`DecryptionSpan-${id}`);
    span.style.display='inline';
    saveValue(id, activeInput.value);
  }
}
var addpair = function(value) {//добавить пару "спан-инпут"
  let id = iterator++;
  let pair= document.createElement('div');
  pair.className = "Textvocabulary";
  pair.id="MyVocabularyText";
  pair.innerHTML =`<span class="Span-In-Vocabulary" id="DecryptionSpan-${id}">${value}</span> <input class="Input-In-Vocabulary" type="text" id="DecryptionInput-${id}" style="display:none;" value="${value}"/>`;
  textcontainerwork.append(pair);
  let span = document.getElementById(`DecryptionSpan-${id}`);
  span.addEventListener('click', spanToInput);
}
var openFormForAdd = function () {//открыть форму для добавления слова
  OpenAdd.style.display = "inline";
  buttonAdd.style.display="none";
}
var closeFormForAdd = function () {//закрыть форму для добавления слова 
  OpenAdd.style.display ="none"; 
  buttonAdd.style.display="inline";
}
span.addEventListener('click', spanToInput);
textmain.addEventListener('click', inputToSpan);
buttonAdd.addEventListener('click', openFormForAdd);
closingСross.addEventListener('click', closeFormForAdd);
checkAdding.addEventListener('click', addpair);
const  dictionary=[{Short:"нзч", long: 'не за что'}, {Short:'чд', long: 'что делаешь?'}, {Short:'ттт', long: 'тьфу-тьфу-тьфу'}];
 dictionary.forEach((Object)=>{
  addpair(Object.Short);
  addpair(Object.long);
 });
var saveValue = function(id, value){
    let input = document.getElementById(`DecryptionInput-${id}`);
    input.value=`${value}`;
    document.getElementById(`DecryptionSpan-${id}`).textContent=`${value}`;
  }
