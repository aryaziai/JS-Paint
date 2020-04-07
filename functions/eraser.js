function eraseMouseDown(e) {
    const canvas = document.getElementById("draw");
    // isPress = true;
    old = { x: e.offsetX, y: e.offsetY };
    canvas.addEventListener("mousemove", eraseMouseMove) 
}

function eraseMouseMove(e) {
    var old = null;
    old = { x: e.offsetX, y: e.offsetY };
    const canvas = document.getElementById("draw");
    const ctx = canvas.getContext("2d");
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 20;
    ctx.moveTo(old.x, old.y);
    ctx.lineTo(x, y);
    old = { x: x, y: y };
}

function eraseMouseUp(e) {
    const canvas = document.getElementById("draw");
    canvas.removeEventListener("mousemove", eraseMouseMove);
}
