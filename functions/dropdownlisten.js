function dropDownListen() {
  let coloringBookArray = [];
  fetch(`${API_ROOT}challenges`)
    .then((response) => response.json())
    .then((json) => loadColoringBooks(json));

  function loadColoringBooks(json) {
    json["data"].forEach((object) => coloringBookArray.push(object));
    let dropDown = document.getElementById("selectBar");

    for (i = 0; i < coloringBookArray.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", coloringBookArray[i].id);

      option.text = coloringBookArray[i]["attributes"]["name"];

      dropDown.appendChild(option);
    }

    dropDown.addEventListener("change", (event) => selectBook(event));
    function selectBook(event) {
      event.preventDefault();
      const canvas = document.getElementById("draw");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let backgroundElement = document.getElementById("draw");
      let currentSong = document.querySelector("#music");

      for (i = 0; i < coloringBookArray.length; i++) {
        if (event.target.value == coloringBookArray[i].id) {
          backgroundElement.style.backgroundImage = `url(${coloringBookArray[i]["attributes"]["img_src"]})`;
          currentSong.src = `${coloringBookArray[i]["attributes"]["song_src"]}`;
        }
      }
      if (document.querySelector("#musicOn")) {
        currentSong.play();
      }
    }
  }
}
