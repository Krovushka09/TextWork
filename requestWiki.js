let resultObj = {definition: '', url: ''};

async function getObj (word) {
    const searchQuery = word.trim();
    let jsObj = await handleSearch();
    resultObj.definition = jsObj.extract;
    resultObj.url = jsObj.content_urls.desktop.page;
    return resultObj;
}

//export default getObj;

async function handleSearch() {
    try {
        const results = await searchWikipedia(searchQuery);
        return results;
      } 
    catch (err) {
        console.log(err);
        alert('Failed to search wikipedia');
      }
  }

async function searchWikipedia(searchQuery) {
    const endpoint = `https://ru.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  }
