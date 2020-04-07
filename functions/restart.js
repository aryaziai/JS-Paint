function restart() {
  const canvas = document.getElementById("draw");
  const ctx = canvas.getContext("2d");

  const restart = document.querySelector("#restart")
 
  restart.addEventListener("click", e => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (document.querySelector("#typingnow")) {
    document.querySelector("#typingnow").remove() }
  });
}
