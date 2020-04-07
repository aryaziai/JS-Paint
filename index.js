  



document.addEventListener("DOMContentLoaded", () => {
    wheelCreator();
    dropDownListen();
    canvaDrawing();
    restart();
    typing();
  
    const canvas = document.getElementById("draw");
    const ctx = canvas.getContext("2d");
    let colors = document.querySelectorAll(".color");
  
    document.querySelector("#eraser").addEventListener("click", e => {
      canvas.removeEventListener("mousedown", drawingMouseDown);
      canvas.removeEventListener("mousemove", drawinngMouseMove);
      canvas.removeEventListener("mouseup", drawingMouseUpAndOut);
   
  
      canvas.addEventListener("mousedown", eraseMouseDown);
      canvas.addEventListener("mouseup", eraseMouseUp);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    });
  
    for (var i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", e => {
        canvas.removeEventListener("mousedown", eraseMouseDown);
        canvas.removeEventListener("mouseup", eraseMouseUp);
  
        canvas.addEventListener("mousedown", drawingMouseDown);
        canvas.addEventListener("mousemove", drawinngMouseMove);
        canvas.addEventListener("mouseup", drawingMouseUpAndOut);
  
        ctx.strokeStyle = event.target.id;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
      });
    }
  });
  




