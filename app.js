const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");

// 캔버스 초기세팅 1 시작
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
  );
    const color = document.getElementById("color");
    const lineWidth = document.getElementById("line-width");
    const canvas = document.querySelector("canvas");
    const ctx = cavas.getContext("2d");
// 캔버스 초기세팅 1 끝

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 800;
    
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.lineWidth = lineWidth.value;
    ctx.lineCap = "round";
    let isPainting = false;
    let isFilling = false;

// fuction 기능 시작

    function onMove(event) {
      if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
      }
      ctx.moveTo(wvent.offsetX, event.offsetY);
    }

    function startPainting() {
      isPainting = true;
    }

    function cancelPainting() {
      isFilling = false;
      // ctx.fill();
      ctx.beginPath();
    }

    function onLineWidthChange(event) {
      ctx.lineWidth = event.target.value;
    }

// 초기세팅 2 이후의 function 기능 추가순서

// 캔버스 초기세팅 2 시작
  function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
  }
  
  function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
  }
// 캔버스 초기세팅 2 끝

// function 기능 마지막 추가

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}


// 캔버스 초기세팅 3 시작 
  canvas.addEventListener("dblclick", onDoubleClick);
  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", cancelPainting);
  canvas.addEventListener("mouseleave", cancelPainting);


  canvas.addEventListener("click", onCanvasClick);
  lineWidth.addEventListener("change", onLineWidthChange);
    color.addEventListener("change", onColorChange);
    colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
// 캔버스 초기세팅 3 끝
  modeBtn.addEventListener("click", onModeClick);
  destroyBtn.addEventListener("click", onDestroyClick);
  eraserBtn.addEventListener("click", onEraserClick);
  fileInput.addEventListener("change", onFileChange);
  saveBtn.addEventListener("click", onSaveClick);





// 첫번째 TEST
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();
// 캔버스의 이해


//  두번째 TEST
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();
// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();
// 각 네모를 통한 연속 그리기 연습


// 세번쨰 TEST
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRext(260, 200, 60, 200)
// ctx.arc(250, 100, 50, 0, 2 * Math.PI);
// ctx.fill();
// ctx.beginPath();
// ctx.fillStyle = "red";
// ctx.arc(260, 80, 5, 0, 2 * Math.PI);
// ctx.arc(220, 80, 5, 0, 2 * Math.PI);
// ctx.fill();
// 사람그리기를 통한 arc연습
// https://www.w3schools.com/tags/canvas_arc.asp
