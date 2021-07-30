async function getDefinitionAndSynonyms(word) {
    const searchQuery = word.trim();
    const result = {};

    // делаем запрос на яндекс
    const resYandex = await getInitialFormAndSynonyms(searchQuery);
    result.synonyms = resYandex.syn ? resYandex.syn : ['Синонимы не найдены'];
    result.urlSynonyms = resYandex.url;
    // запрос на wikipedia
    const resWiki = await getDefinition(resYandex.initialForm ? resYandex.initialForm : searchQuery);
    result.definition = resWiki.definition;
    result.urlDefinition = resWiki.url;
    return result;
}

async function getInitialFormAndSynonyms(word) {
    const res = {
      syn: []
    };
    const answer = await searchQuery(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210719T110344Z.d10dc7be15af410e.076c0dcf9789baf9ea84c3ef96a4ac08855547a5&lang=ru-ru&flags=4&text=${word}`);
    console.log(answer);
    console.log('if: ' + answer.def[0]);
    try{res.initialForm = answer.def[0].text;}
    catch{return 'Синонимы не найдены.'}
    res.url = "https://translate.yandex.ru/?lang=ru-en&text=" + res.initialForm;
    let table = answer.def[0].tr;
    for (let i = 0; i < 3; i++) {
      if (table[i]) {
        res.syn[i] = table[i].text
      }
    }
    return res;
}

async function getDefinition(word) {
   const result = {};
   const answer = await searchQuery(`https://ru.wikipedia.org/api/rest_v1/page/summary/${word}`);
     if (answer) {
       result.definition = answer['extract'] ? answer['extract'] : 'К сожалению, определение не найдено.';
       result.url = answer.content_urls ?  answer.content_urls.desktop.page : `https://google.com/search?q=${word}`;
     } else {
       result.definition = "К сожалению, определение не найдено.";
       result.url = `https://google.com/search?q=${word}`;
     }
     return result;
}

async function searchQuery(endpoint) {
  const response = await fetch (endpoint);
  const json = await response.json();
  return json;
}
