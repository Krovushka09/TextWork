let resultObj = {syn: [], url: '',word: ""};



async function getObj (word) {
    const searchQuery = word;
    let jsObj = await handleSearch(searchQuery);
    resultObj.word = jsObj.def[0].text
    resultObj.url = "https://translate.yandex.ru/?lang=ru-en&text=" + resultObj.word
    let table = jsObj.def[0].tr
    for(let i = 0; i < 3; i++){
      resultObj.syn[i] = table[i].text
    }
    console.log(resultObj)
    return resultObj;
}

async function handleSearch(searchQuery) {
   try{
        const results = await getAPI(searchQuery);
        return results;
   }
   catch (err) {
        console.log(err)
        alert('Failed connect to api');
      }
  }

async function getAPI(searchQuery){
  const endpoint = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210719T110344Z.d10dc7be15af410e.076c0dcf9789baf9ea84c3ef96a4ac08855547a5&lang=ru-ru&flags=4&text=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText); 
    }
    const json = await response.json();
    return json;
}
