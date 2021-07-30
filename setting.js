function clickheandler(event) {
  const settedObj = {};
  if(document.getElementById(event.target.id).checked) {
    settedObj[event.target.id] = "true";
    chrome.storage.sync.set(settedObj);
  } else {
    settedObj[event.target.id] = "false";
    chrome.storage.sync.set(settedObj);
  }
  updateSetting(event.target.id);
};

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
    if(localStorageItem == 'true'){
      //document.getElementById(mode).style.display="block";
    }else if(localStorageItem==null){
      chrome.storage.sync.set({mode:"true"})
    }else{
      document.getElementById(mode).style.display="none";
    }
}

let id = ["Definition", "Synonyms"];

id.forEach(async(id) => {
  let checkbox = document.getElementById(id);
  updateSetting(id);
  checkbox.addEventListener("click", event => clickheandler(event));
  var localStorageItem= await getLocalStorageValue(id);
  if (localStorageItem == "true") {
    checkbox.setAttribute('checked','checked');
  }
});
