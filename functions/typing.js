function typing() {
  let typingImage = document.querySelector("#typing");

  typingImage.addEventListener("click", event => {
    let testPlace = document.querySelector("#numberPicker");

    let newInputLife = document.createElement("input");
    newInputLife.setAttribute("id", "typingnow");
    newInputLife.placeholder = "Type Here";

    testPlace.append(newInputLife);
  });
}
