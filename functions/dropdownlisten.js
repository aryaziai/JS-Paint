
function dropDownListen() {
  let coloringBookArray = [ ]
  fetch(`${API_ROOT}challenges`)
  .then(response => response.json())
  .then(json => loadColoringBooks(json))

  function loadColoringBooks(json){
    json["data"].forEach(object => coloringBookArray.push(object))
    let dropDown = document.getElementById("selectBar")
    
     for(i = 0; i < coloringBookArray.length; i++){
       
      let option = document.createElement("option")
      option.setAttribute("value", coloringBookArray[i].id) 
      
      option.text = coloringBookArray[i]["attributes"]["name"]
      
      dropDown.appendChild(option)
      
  }

  dropDown.addEventListener("change", event => selectBook(event))
  function selectBook(event){
    event.preventDefault()
    let backgroundElement = document.getElementById("draw")
    let currentSong = document.querySelector("#music")
    for(i = 0; i < coloringBookArray.length; i++){
      if(event.target.value == coloringBookArray[i].id){
        backgroundElement.style.backgroundImage = `url(${coloringBookArray[i]["attributes"]["img_src"]})`
        currentSong.src = `${coloringBookArray[i]["attributes"]["song_src"]}`
      }
    }
    
  }
    
  }
  
  // const canvas = document.getElementById("draw");
  // const ctx = canvas.getContext("2d");
  // let musicButton = document.querySelector("#musicOn");
  // let drawMe = document.querySelector("#draw");
  // let dropDownThingy = document.getElementById("dropdown");

  
  // dropDownThingy.addEventListener("change", event => {
  //   let colorBookSelection = event.target.value;
  //   let currentSong = document.querySelector("#music");

  //   if (colorBookSelection === "free_draw") {
  //     drawMe.style.backgroundImage = `url("")`;
  //     canvas.width = 768;
  //     canvas.height = 1024;
  //     currentSong.src = "songs/gorillaz.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "playground") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/gbmtLB0.jpg")`;
  //     canvas.width = 768;
  //     canvas.height = 873;
  //     currentSong.src = "songs/kicks.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "wild_west") {
  //     drawMe.style.backgroundImage = `url("https://i.pinimg.com/originals/ed/a8/b9/eda8b9a286a7815b10919aa9b5399c6f.jpg")`;
  //     canvas.width = 768;
  //     canvas.height = 1024;
  //     currentSong.src = "songs/old.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "psychedelic") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/DdLVV0G.jpg")`;
  //     canvas.width = 768;
  //     canvas.height = 1219;
  //     currentSong.src = "songs/lucid.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "kangaroo") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/HKLqZlb.png")`;
  //     canvas.width = 768;
  //     canvas.height = 721;
  //     currentSong.src = "songs/kangaroo.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "firefly") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/yqCS4qe.jpg")`;
  //     canvas.width = 768;
  //     canvas.height = 711;
  //     currentSong.src = "songs/fireflies.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "rockstar") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/PR9zmf0.png")`;
  //     canvas.width = 768;
  //     canvas.height = 1015;
  //     currentSong.src = "songs/rockstar.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "dreams") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/2QBph5J.png")`;
  //     canvas.width = 768;
  //     canvas.height = 768;
  //     currentSong.src = "songs/dreams.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (colorBookSelection === "africa") {
  //     drawMe.style.backgroundImage = `url("https://i.imgur.com/mCRRPNS.jpg")`;
  //     canvas.width = 768;
  //     canvas.height = 994;
  //     currentSong.src = "songs/africa.mp3";
  //     ctx.lineWidth = document.querySelector("#myNumber").value;
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     if (musicButton.id === "musicOn") {
  //       currentSong.play();
  //     }
  //   }

  //   if (document.querySelector("#typingnow")) {
  //     document.querySelector("#typingnow").remove();
  //   }
  // });
}
