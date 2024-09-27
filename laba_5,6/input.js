const elements = document.querySelectorAll(".target")

let activeDiv = null;
let action = null;
let differenceX, differenceY;

elements.forEach(div => {
  let newPositionX = div.offsetLeft;
  let newPositionY = div.offsetTop;

  div.addEventListener('mousedown', (e) => {
    if (activeDiv === null) {
      activeDiv = div;
      action = 'move';
      differenceX = e.clientX - div.offsetLeft;
      differenceY = e.clientY - div.offsetTop;
      div.style.zIndex = 1000;
    }
  })
  div.addEventListener('dblclick', (e) => {
    if (activeDiv === null) {
      activeDiv = div;
      action = 'dblClick';
      differenceX = e.clientX - div.offsetLeft;
      differenceY = e.clientY - div.offsetTop;
      div.style.backgroundColor = 'cornflowerblue';
      div.style.zIndex = 1000;
    }
  })
  div.addEventListener('mousemove', (e) => {
    if (div === activeDiv && action) {
      div.style.left = `${e.clientX - differenceX}px`;
      div.style.top = `${e.clientY - differenceY}px`;
    }
  })
  div.addEventListener('click', (e) => {
    if (div === activeDiv && action === 'dblClick') {
      activeDiv = null;
      action = null;
      newPositionX = div.offsetLeft;
      newPositionY = div.offsetTop;
      div.style.backgroundColor = 'red';
      div.style.zIndex = '1';
    }
  })
  div.addEventListener('mouseup', (e) => {
    if (div === activeDiv && action === 'move') {
      activeDiv = null;
      action = null;
      newPositionX = div.offsetLeft;
      newPositionY = div.offsetTop;
      div.style.zIndex = '1';
    }
  })
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && activeDiv === div) {
      activeDiv = null;
      action = null;
      div.style.left = newPositionX + 'px';
      div.style.top = newPositionY + 'px';
      div.style.backgroundColor = 'red';
      div.style.zIndex = '1';
    }
  });
})