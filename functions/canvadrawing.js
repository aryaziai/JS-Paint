// function canvaDrawing() { 
    

//     const canvas = document.getElementById("draw");
//     let isDrawing = false;
//     const ctx = canvas.getContext("2d");
//     canvas.width = 768;
//     canvas.height = 873;
    

//     ctx.lineWidth= document.querySelector("#myNumber").value;

//     let numberPicker = document.querySelector("#numberPicker");
//     numberPicker.addEventListener("click", () => {
//         ctx.lineWidth = document.querySelector("#myNumber").value;
//         ctx.lineJoin = "round"; ctx.lineCap = "round";
//     });

//     ctx.strokeStyle = "black";
//     let lastX = 0;
//     let lastY = 0;
//     function draw(e) {
//         // stop the function if they are not mouse down
//         if (!isDrawing) return;
//         //listen for mouse move event
//         //   console.log(e)
//         ctx.beginPath();
//         ctx.moveTo(lastX, lastY);
//         ctx.lineTo(e.offsetX, e.offsetY);
//         ctx.stroke();
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//     }
//     canvas.addEventListener("mousedown", e => {
//         isDrawing = true;
//         [lastX, lastY] = [e.offsetX, e.offsetY];
//     });
//     canvas.addEventListener("mousemove", draw);
//     canvas.addEventListener("mouseup", () => (isDrawing = false));
//     canvas.addEventListener("mouseout", () => (isDrawing = false));

// }


const canvas = document.getElementById("draw");
let isDrawing = false;
const ctx = canvas.getContext("2d");
canvas.width = 768;
canvas.height = 873;

let lastX = 0;
let lastY = 0;
ctx.lineJoin = "round";
ctx.lineCap = "round";


function canvaDrawing() {

ctx.lineWidth = document.querySelector("#myNumber").value;

let numberPicker = document.querySelector("#numberPicker");
numberPicker.addEventListener("click", () => {
  ctx.lineWidth = document.querySelector("#myNumber").value;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
});

canvas.addEventListener("mousedown", drawingMouseDown)
canvas.addEventListener("mousemove", drawinngMouseMove)
canvas.addEventListener("mouseup", drawingMouseUpAndOut)
canvas.addEventListener("mouseout", drawingMouseUpAndOut)
}

// callback functions:

function drawinngMouseMove(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.globalCompositeOperation = "source-over"; // important
  console.log("drawing is active!")
}


function drawingMouseDown(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.globalCompositeOperation = "source-over"; // important
}

function drawingMouseUpAndOut(e) {
  isDrawing = false;
}


