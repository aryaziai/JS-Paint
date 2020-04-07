function wheelCreator() {
    let numberPicker = document.createElement("div")
    numberPicker.innerHTML =
    `<div id="numberPicker">
                <span class="input-group-btn">
                    <button class="btn btn-default" id="down" onclick=" down('1')">-</span>
                </button>
            </span>
            <input class="form-control input-number" id="myNumber" type="text" value="10"/>
            <span class="input-group-btn">
                <button class="btn btn-default" id="up" onclick="up('40')">+</button>
            </span>
            </div>`


    const wheelId = document.querySelector("#colorWheelDemo");
    wheelId.prepend(numberPicker)
  
    let blue = document.createElement("button");
    blue.setAttribute("id", "blue");
    blue.setAttribute("class", "color");
    wheelId.append(blue);
  
    let lightblue = document.createElement("button");
    lightblue.setAttribute("id", "lightblue");
    lightblue.setAttribute("class", "color");
    wheelId.append(lightblue);
  
    let green = document.createElement("button");
    green.setAttribute("id", "green");
    green.setAttribute("class", "color");
    wheelId.append(green);
  
    let red = document.createElement("button");
    red.setAttribute("id", "red");
    red.setAttribute("class", "color");
    wheelId.append(red);
  
    let purple = document.createElement("button");
    purple.setAttribute("id", "purple");
    purple.setAttribute("class", "color");
    wheelId.append(purple);
  
    let orange = document.createElement("button");
    orange.setAttribute("id", "orange");
    orange.setAttribute("class", "color");
    wheelId.append(orange);
  
    let brown = document.createElement("button");
    brown.setAttribute("id", "brown");
    brown.setAttribute("class", "color");
    wheelId.append(brown);
  
    let gold = document.createElement("button");
    gold.setAttribute("id", "gold");
    gold.setAttribute("class", "color");
    wheelId.append(gold);
  
    let black = document.createElement("button");
    black.setAttribute("id", "black");
    black.setAttribute("class", "color");
    wheelId.append(black);
  
    let silver = document.createElement("button");
    silver.setAttribute("id", "silver");
    silver.setAttribute("class", "color");
    wheelId.append(silver);
  
    let musicButton = document.createElement("img");
    musicButton.src = "https://i.imgur.com/tk0v9e3.png";
    musicButton.setAttribute("id", "musicOn");
    wheelId.append(musicButton);
  
    musicButton.addEventListener("click", e => {
      var musicPlayer = document.getElementById("music");
  
      if (musicButton.id === "musicOn") {
        musicButton.src = "https://i.imgur.com/8sH5Kj9.png";
        musicButton.setAttribute("id", "musicOff");
        musicPlayer.pause();
      } else {
        musicButton.src = "https://i.imgur.com/tk0v9e3.png";
        musicButton.setAttribute("id", "musicOn");
        musicPlayer.play();
      }
    });
  
    let eraser = document.createElement("img");
    eraser.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOkMMSeZ-uV5xvUt57M8pOZPXpE2ts2vbXpt3Ivri09o5Y2Z4C&s";
    eraser.setAttribute("id", "eraser");
    wheelId.append(eraser);
  
    let typing = document.createElement("img");
    typing.src =
      "https://www.timelesswroughtiron.com/v/vspfiles/photos/UGHT-IRON-HOUSE-LETTER-T-LET-T-2T.jpg";
    typing.setAttribute("id", "typing");
    wheelId.append(typing);
  
    let restart = document.createElement("img");
    restart.src = "https://image.flaticon.com/icons/png/512/61/61848.png";
    restart.setAttribute("id", "restart");
    wheelId.append(restart);
  
  }
  