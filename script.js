const selectableTextArea = document.querySelectorAll("body");
const popupWin = document.querySelector("#myFormDS");
console.log(popupWin);//точки останова для джунов
selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
  console.log(elem);//точки останова для джунов
});
console.log(popupWin);//точки останова для джунов

document.addEventListener("mousedown", documentMouseDown);

function selectableTextAreaMouseUp(event) {
  setTimeout(() => {
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) {
      const x = event.pageX;
      const y = event.pageY;
      const popupWinWidth = Number(getComputedStyle(popupWin).width.slice(0,-2));
      const popupWinHeight = Number(getComputedStyle(popupWin).height.slice(0,-2));

      if(document.activeElement !== popupWin) {
        popupWin.style.left = `${x - popupWinWidth*0.5}px`;
        popupWin.style.top = `${y - popupWinHeight*1.1}px`;
        popupWin.style.display = "block";
      }
      else {
        popupWin.style.left = `${x-popupWinWidth*0.5}px`;
        popupWin.style.top = `${y-popupWinHeight*0.5}px`;
      }
    }
  }, 0);
}

function documentMouseDown(event) {
  if(event.target.id!=="myFormDS" && getComputedStyle(popupWin).display==="block") {
    popupWin.style.display = "none";
    window.getSelection().empty();
  }
}


function popupWinClick(event) {
  const selectedText = window.getSelection().toString().trim();
}
