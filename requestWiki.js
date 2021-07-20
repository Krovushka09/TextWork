let resultObj = {definition: '', url: ''};

async function getObj (word) {
    const searchQuery = word.trim();
    let jsObj = await handleSearch(searchQuery);
    if(jsObj){
      resultObj.definition = jsObj['extract'];
      resultObj.url = jsObj.content_urls.desktop.page;
    }else{
      resultObj.definition = "К сожилению, определение не найдено.";
      resultObj.url = `https://google.com/search?q=${searchQuery}`;
    }
    return resultObj;
}

//export default getObj;

async function handleSearch(searchQuery) {
    try {
        const results = await searchWikipedia(searchQuery);
        return results;
      }
    catch (err) {
        console.log(err);
      }
  }

async function searchWikipedia(searchQuery) {
    const endpoint = `https://ru.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`;
    const response = await fetch(endpoint);
    console.log(response);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  }
