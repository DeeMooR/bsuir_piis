const elements = document.querySelectorAll(".target")

let activeDiv = null;
let action = null;
let differenceX, differenceY;
let lastTouchTime;

elements.forEach(div => {
  let newPositionX = div.offsetLeft;
  let newPositionY = div.offsetTop;

  const isDblTouch = () => {
    const now = new Date().getTime();
    const differenceTime = now - lastTouchTime;
    lastTouchTime = now;
    return (differenceTime < 300);
  }

  const escape = () => {
    activeDiv = null;
    action = null;
    activeFinger = false;
    div.style.left = newPositionX + 'px';
    div.style.top = newPositionY + 'px';
    div.style.backgroundColor = 'red';
    div.style.zIndex = '1';
  }

  div.addEventListener('mousedown', (e) => {
    if (!activeDiv) {
      activeDiv = div;
      action = 'move';
      differenceX = e.clientX - div.offsetLeft;
      differenceY = e.clientY - div.offsetTop;
      div.style.zIndex = 1000;
    }
  })
  div.addEventListener('dblclick', (e) => {
    if (!activeDiv) {
      activeDiv = div;
      action = 'dblClick';
      differenceX = e.clientX - div.offsetLeft;
      differenceY = e.clientY - div.offsetTop;
      div.style.backgroundColor = 'cornflowerblue';
      div.style.zIndex = 1000;
    }
  })
  document.addEventListener('mousemove', (e) => {
    if (div === activeDiv && action) {
      div.style.left = `${e.clientX - differenceX}px`;
      div.style.top = `${e.clientY - differenceY}px`;
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
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && activeDiv === div) {
      escape();
    }
  });


  div.addEventListener("touchstart", (e) => {
    if (!activeDiv && action !== 'touch_dblClick') {
      activeDiv = div;
      action = 'touch_move';
      differenceX = e.touches[0].clientX - div.offsetLeft;
      differenceY = e.touches[0].clientY - div.offsetTop;
      div.style.zIndex = 1000;
    }
  })
  document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) escape();
  })
  document.addEventListener("touchmove", (e) => {
    if (action) {
      activeDiv.style.left = `${e.touches[0].clientX - differenceX}px`;
      activeDiv.style.top = `${e.touches[0].clientY - differenceY}px`;
    }
  })
  div.addEventListener("touchend", (e) => {
    if (div === activeDiv && action === 'touch_move') {
      if (isDblTouch()) {
        action = 'touch_dblClick';
        div.style.backgroundColor = 'cornflowerblue';
        return;
      }
      activeDiv = null;
      action = null;
      newPositionX = div.offsetLeft;
      newPositionY = div.offsetTop;
      div.style.zIndex = '1';
    }
  })
})