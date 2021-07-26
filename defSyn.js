document.body.addEventListener("mousedown", documentMouseDown);
let div = document.createElement('div');
div.className = "alert";
div.id="popup";
div.style.display="none";
div.innerHTML = "<div class=\"textwork-form-popup-ds\" id=\"defSyn\"><div class=\"textwork-form-container\"><span class=\"close\" onclick=\"closeFormDS()\"></span><div class=\"textwork-difinition\"><div class=\"textwork-definitionTitle\"><p>Значение слова:</p></div><div class = \"textwork-definitionText\"><p id=\"text5\"></p></div><span class=\"textwork-link1\"><a href=\"\" target=\"_blank\" id=\"hrefWiki\" name=\"hrefWiki\">подробнее</a></span></div><div><hr></div><div class=\"textwork-synonyms\"><div class=\"textwork-synonymTitle\"><p>Синонимы:</p></div><div class = \"textwork-synonyms-list\"><ul class =\"synonymText\" id=\"listSynonyms\"></ul></div><span class=\"textwork-link2\"><a href=\"\" id=\"hrefSyn\" target=\"_blank\">подробнее</a></span></div></div></div>";
document.body.append(div);
const selectableTextArea = document.querySelectorAll("body");
const popupWin = document.querySelector("#popup");

selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});


function selectableTextAreaMouseUp(event) {
  setTimeout(async() => {
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) {
      const defSynObj = await getDefinitionAndSynonyms(selectedText);
      const x = event.pageX;
      const y = event.pageY;
      const popupWinWidth = Number(popupWin.style.width.slice(0,-2));
      const popupWinHeight = Number(popupWin.style.height.slice(0,-2));

      if(document.activeElement !== popupWin) {
        popupWin.style.left = `${x - popupWinWidth*0.5}px`;
        popupWin.style.top = `${y - popupWinHeight*1.1}px`;
        popupWin.style.display = "block";
        popupWin.style.position="absolute";
        document.getElementById('text5').innerHTML=defSynObj.definition;
        document.getElementById('hrefWiki').href = defSynObj.urlDefinition;
        for(var i=0; i<defSynObj.synonyms.length; i++){
          document.getElementById('listSynonyms').innerHTML+='<li>' +defSynObj.synonyms[i]  + '</li>';
        }
        document.getElementById('hrefSyn').href = defSynObj.urlSynonyms;
      }
      else {
        popupWin.style.left = `${x-popupWinWidth*0.5}px`;
        popupWin.style.top = `${y-popupWinHeight*0.5}px`;
      }
    }
  }, 0);
}

function documentMouseDown(event) {
  if(event.target.id!=="hrefWiki" && event.target.id!=="hrefSyn" && popupWin.style.display==="block") {
    popupWin.style.display = "none";
    document.getElementById('listSynonyms').innerHTML = "";
    window.getSelection().empty();
  }
}
