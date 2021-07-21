let btnAdd = document.querySelector('.add');
let btnDel = document.querySelector('.del');
let btnUp = document.querySelector('.up');

btnAdd.onclick = function () {
    if (localStorage.getItem('dictionary')==null) {
        createJSON();
    }
    let short = document.querySelector('.short');
    let long = document.querySelector('.long');
    addWord(short.value.toString(), long.value.toString());
}

btnDel.onclick = function () {
    if (localStorage.getItem('dictionary')==null) {
        createJSON();
    }
    let shortDel = document.querySelector('.shortDel');
    deleteWord(shortDel.value.toString());
}

btnUp.onclick = function () {
    if (localStorage.getItem('dictionary')==null) {
        createJSON();
    }
    update();
}

function addWord (shortEl, longEl) {
    const strObj = localStorage.getItem('dictionary');
    let jsObj = JSON.parse(strObj);
    jsObj.dictionary.push({short: shortEl, long: longEl});
    localStorage.setItem('dictionary', JSON.stringify(jsObj));
}

function deleteWord (shorlEl) {
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

function update() {
    const strObj = localStorage.getItem('dictionary');
    let jsObj = JSON.parse(strObj);
    jsObj.dictionary.forEach(el => {
        let myDiv = document.createElement('div');
        myDiv.textContent = el.short + ' - ' + el.long;
        my_div = document.getElementById("words");
        document.body.insertBefore(myDiv, my_div);
    });
}