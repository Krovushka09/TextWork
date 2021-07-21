function addWord (shortEl, longEl) {
    if (localStorage.getItem('dictionary')==null) {
        createJSON();
    }
    const strObj = localStorage.getItem('dictionary');
    let jsObj = JSON.parse(strObj);
    jsObj.dictionary.push({short: shortEl, long: longEl});
    localStorage.setItem('dictionary', JSON.stringify(jsObj));
}

function deleteWord (shorlEl) {
    if (localStorage.getItem('dictionary')==null) {
        createJSON();
    }
    const strObj = localStorage.getItem('dictionary');
    let jsObj = JSON.parse(strObj);
    jsObj.dictionary.splice(jsObj.dictionary.indexOf(shorlEl, 0), 1);
    localStorage.setItem('dictionary', JSON.stringify(jsObj));
}

function createJSON () {
    let object = {
        dictionary: [
        {short: 'нзч', long: 'не за что'},
        {short: 'milf', long: 'man i love family'}
    ]};
    localStorage.setItem('dictionary', JSON.stringify(object));
}