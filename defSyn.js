document.body.addEventListener("mousedown", documentMouseDown);

function getLocalStorageValue(key) {
  return new Promise((resolve, reject) => {
      try {
          chrome.storage.sync.get(key, function (value) {
              resolve(value[key]);
          })
      } catch (ex) {
          reject(ex);
      }
  });
}
async function updateSetting(mode){
  var localStorageItem= await getLocalStorageValue(mode);
  var isEnable=localStorageItem == 'true';
    if(isEnable){
      document.getElementById(mode).style.display="block";
    }else if(localStorageItem==null){
      chrome.storage.sync.set({mode:"true"});
    }else{
      document.getElementById(mode).style.display="none";
    }
    return isEnable;
}

let div = document.createElement('div');
div.className = "alert";
div.id="TextWork__popup";
div.style.display="none";
div.innerHTML = "<div class=\"textwork-form-popup-ds\" id=\"defSyn\"><div class=\"textwork-form-container\"><span class=\"close\" onclick=\"closeFormDS()\"></span><div class=\"textwork-difinition\" id=\"Definition\"><div class=\"textwork-definitionTitle\"><p>Значение слова:</p></div><div class = \"textwork-definitionText\"><p id=\"text5\"></p></div><span class=\"textwork-link1\"><a href=\"\" target=\"_blank\" id=\"hrefWiki\" name=\"hrefWiki\">подробнее</a></span></div><div></div><div class=\"textwork-synonyms\" id=\"Synonyms\"><div class=\"textwork-synonymTitle\"><p>Синонимы:</p></div><div class = \"textwork-synonyms-list\"><ul class =\"synonymText\" id=\"listSynonyms\"></ul></div><span class=\"textwork-link2\"><a href=\"\" id=\"hrefSyn\" target=\"_blank\">подробнее</a></span></div></div></div>";
document.body.append(div);
let modes = ["Definition", "Synonyms"];

const selectableTextArea = document.querySelectorAll("body");
const popupWin = document.querySelector("#TextWork__popup");

const settings = {
  Definition: true,
  Synonyms: true,
  AutoWord:false,
  AutoText: false,
  DictionaryHints: false,
};

selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

function getSettings() {
  Object.keys(settings).forEach((nameSetting) => {
    const localStorageValue = localStorage.getItem(nameSetting);
    const valueSetting = localStorageValue === null ? true : localStorageValue
    settings[nameSetting] = valueSetting;
  })
}

function selectableTextAreaMouseUp(event) {
  setTimeout(async() => {
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) {
      getSettings();
      const defSynObj = await getDefinitionAndSynonyms(selectedText);
      const x = event.pageX;
      const y = event.pageY;
      const popupWinWidth = Number(popupWin.style.width.slice(0,-2));
      const popupWinHeight = Number(popupWin.style.height.slice(0,-2));

      if(document.activeElement !== popupWin) {
        popupWin.style.left = `${x - popupWinWidth*0.5}px`;
        popupWin.style.top = `${y - popupWinHeight*1.1}px`;
        popupWin.style.display = "block";
        modes.forEach(async (mode) => {
          await updateSetting(mode);
        });

        popupWin.style.position="absolute";
        document.getElementById('text5').innerHTML=defSynObj.definition;
        document.getElementById('hrefWiki').href = defSynObj.urlDefinition;
        for(var i=0; i<defSynObj.synonyms.length; i++){
          document.getElementById('listSynonyms').innerHTML+='<li>' +defSynObj.synonyms[i]  + '</li>';
        }
        const hrefSyn = document.getElementById('hrefSyn');
        if (defSynObj.urlSynonyms) {
          hrefSyn.style.display = "inline";
          hrefSyn.href = defSynObj.urlSynonyms;
        } else {
          hrefSyn.style.display = "none";
        }
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
