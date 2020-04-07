
const mainnav = document.createElement("div")
mainnav.setAttribute("class", "mainnav")
document.body.prepend(mainnav)




const logo = document.createElement("img")
logo.setAttribute("class", "thelogo" )
logo.src="https://i.imgur.com/6zNKw1U.png"
logo.addEventListener("click", event => authorizeUser(event))
function authorizeUser(event){
    event.preventDefault()
    if (currentUser == null){
        console.log("not authorized")
    } else {
        loadCanvas(event)
    }
}


mainnav.append(logo)


const topnav = document.createElement("div")
topnav.setAttribute("class", "topnav")

topnav.innerHTML += `         
<a class="active" href="#profile">Profile</a>
<a href="#gallery">Gallery</a>`

mainnav.appendChild(topnav)

const rightnav = document.createElement("div")
rightnav.setAttribute("class", "rightnav")
rightnav.innerHTML = `
<a id="logoutButton" class="active" href="#Logout">LogIn</a>`
mainnav.append(rightnav)
if (currentUser == null){
    let login = document.getElementById("logoutButton")
    login.addEventListener("click", event => signUserIn(event))
} 

let profile = document.querySelector("body > div.mainnav > div.topnav > a.active")
profile.addEventListener("click", event => loadProfile(event))
function loadProfile(event){
    event.preventDefault()
    if(currentUser == null ){
        console.log("not authorized")
    } else {
        document.getElementById("user-drawings-container").innerHTML = ""
        document.getElementById("edit-user-profile").style.display = "none"
        document.getElementById("canvas").style.display = "none"
        document.getElementById("all-drawings").style.display = "none"
        renderUserProfile(currentUser)
    }
}
let allDrawings = [ ]
let gallery = document.querySelector("body > div.mainnav > div.topnav > a:nth-child(2)")
gallery.addEventListener("click", event => loadGallery(event))
function loadGallery(event){
    if(currentUser == null ){
        console.log("not authorized")
    } else {
        document.getElementById("edit-user-profile").style.display = "none"
        document.getElementById("canvas").style.display = "none"
        document.getElementById("user-profile").style.display = "none"
        let show = document.getElementById("all-drawings")
        show.style.display = "block"
        fetch(`${API_ROOT}drawings`)
        .then(response => response.json())
        .then(json => {allDrawings = json;
        loadDrawings(allDrawings)})
    }
}

function loadDrawings(allDrawings){
    allDrawings.forEach(drawing => {
        let drawingCardDiv = document.createElement("div")
        let user = document.createElement("h5")
        user.innerText = `${drawing.user.username}`
        let likeButton = document.createElement("img")
        likeButton.setAttribute("id", `${drawing.id}`)
       
        likeButton.src = "./assets/unlike.png" 
        likeButton.style.cssText ="width:5%;"
        if (likeButton.getAttribute("added") === null){
        likeButton.addEventListener("click", event => handleLikeClick(event))}
   
        let backgroundImg = drawing.challenge.img_src
        let drawingCard = document.createElement("CANVAS")
        drawingCard.setAttribute("class", "drawing-card")
        drawingCard.style.backgroundImage = `url(${backgroundImg})`
        drawingCard.style.backgroundRepeat = "no-repeat"
        drawingCard.width = 768
        drawingCard.height = 873
        let ctx = drawingCard.getContext('2d')
        let img = new Image
        img.onload = function(){
            ctx.drawImage(img,0,0);
        };
        img.src = drawing.canvas_url
        drawingCard.append(img)
        drawingCardDiv.append(drawingCard)
        drawingCardDiv.append(likeButton)
        drawingCardDiv.prepend(user)
        document.getElementById("all-drawings").append(drawingCardDiv)
    })
}

function handleLikeClick(event){
    let likeButton = document.getElementById(event.target.id)
    if (likeButton.getAttribute("added") === null) {
    likeButton.setAttribute("added", "true")}
    if (likeButton.getAttribute("Clicked") === null ){
    likeButton.src = "./assets/like.png"
    likeButton.style.color = "red"
    likeButton.setAttribute("Clicked" ,"red")
    fetch(`${API_ROOT}likes`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'},
        body: JSON.stringify({user_id: currentUser.id, drawing_id: event.target.id})
    }).then(response => response.json())
    .then(json => { like = (json)})}
    else {
       likeButton.removeAttribute("Clicked")
        likeButton.src = "./assets/unlike.png"
        fetch(`${API_ROOT}likes/${like.id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'}
    }).then(response => response.json())
.then(console.log())}
       
    }
