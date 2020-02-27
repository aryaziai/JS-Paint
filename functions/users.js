// initiate max-scope variable 'currentUser' to be used to keep track of current-user login
let currentUser;

// initiate array 'allUsers' to front-load all the users for validation when creating users
let allUsers = [];

let currentUserDrawings = [];

const API_ROOT = "https://js-paint-server.herokuapp.com/";

// set to toggle displayy blocks
let createUserAccount = false;
let signIn = false;

document.addEventListener("DOMContentLoaded", () => {
  const choiceForm = document.getElementById("choice-container");
  fetchAllUsers();
  choiceForm.addEventListener("click", event => handleChoiceClick(event));
});

// make request to database to front-load all users
function fetchAllUsers() {
  fetch(API_ROOT + "users")
    .then(response => response.json())
    .then(json => populateAllUsers(json));
}

function populateAllUsers(json) {
  json.forEach(user => allUsers.push(user));
}

function handleChoiceClick(event) {
  event.preventDefault();
  if (event.target.id == "sign-in-button") {
    signUserIn();
  }
  if (event.target.id == "sign-up-button") {
    createUserAccount = !createUserAccount;
    createUser();
  }
}

function signUserIn() {
  document
    .getElementById("additionalSignUp")
    .addEventListener("click", event => {
      createUserAccount = !createUserAccount;
      createUser(event);
    });
  if (createUserAccount) {
    createUserAccount = !createUserAccount;
    document.getElementById("sign-up-container").style.display = "none";

    signIn = !signIn;
    if (signIn) {
      let loginForm = document.getElementById("signIn");
      loginForm.style.display = "block";
      document.getElementById("log-in-container").style.display = "block";
    }
  }
  signIn = !signIn;
  let signInForm = document.getElementById("signIn");
  const choiceForm = document.getElementById("choice-container");
  const heart = document.getElementById("heart-gif");
  let logInForm = document.getElementById("log-in-container");

  if (signIn) {
    logInForm.style.display = "block";
    choiceForm.style.display = "none";
    heart.style.display = "none";
  }

  signInForm.addEventListener("submit", event => userSignIn(event));
}

function userSignIn(event) {
  document.getElementById("loader").style.display = "block";

  event.preventDefault();

  let usernameValue = document.getElementById("username-input").value;

  fetch(`${API_ROOT}users/${usernameValue}`)
    .then(response => response.json())
    .then(json => authenticateUser(json));
}

function authenticateUser(json) {
  if (json.error || document.getElementById("username-input").value == "") {
    if (
      confirm("this user doesn't exist would you like to create an account?")
    ) {
      createUserAccount = !createUserAccount;
      createUser();
    }
    document.getElementById("username-input").value = null;
  } else {
    currentUser = json;

    renderUserProfile(currentUser);
  }
}

function renderUserProfile(currentUser) {
  document.getElementById("loader").style.display = "block";
  let login = document.getElementById("logoutButton");
  login.innerText = "Logout";
  login.onclick = event => logout(event);
  if (createUserAccount) {
    document.getElementById("sign-up-container").style.display = "none";
  }

  currentUserDrawings = currentUser.drawings;

  renderDrawing(currentUserDrawings);

  document.getElementById("log-in-container").style.display = "none";
  document.getElementById("user-profile").style.display = "block";
  document.getElementById(
    "profile-name"
  ).innerText = `${currentUser.name}'s Profile`;
  const renderUserProfileEventListenerHandlers = {
    "edit-profile": editProfile,
    "log-out": logout,
    "new-drawing": loadCanvas
  };
  addElementListeners(renderUserProfileEventListenerHandlers, "click");

  document.getElementById("loader").style.display = "none";
}

function renderDrawing(currentUserDrawings) {
  console.log(currentUserDrawings);

  const drawingDiv = document.getElementById("user-drawings-container");
  currentUserDrawings.forEach(drawing => {
    console.log(drawing);
    let likes = drawing.likes.length;
    let likeCounter = document.createElement("h5");
    likeCounter.innerText = `${likes} Likes`;
    let deleteButton = document.createElement("button");
    let drawingCardDiv = document.createElement("div");
    deleteButton.innerText = "X";
    deleteButton.setAttribute("id", `${drawing.id}`);
    deleteButton.setAttribute("class", "deleteMe");
    deleteButton.addEventListener("click", event => deleteDrawing(event));
    let backgroundImg = drawing.challenge.img_src;
    let drawingCard = document.createElement("CANVAS");
    drawingCard.setAttribute("class", "drawing-card");
    drawingCard.style.backgroundImage = `url(${backgroundImg})`;
    drawingCard.style.backgroundRepeat = "no-repeat";
    drawingCard.width = 768;
    drawingCard.height = 873;
    let ctx = drawingCard.getContext("2d");
    let img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = drawing.canvas_url;
    drawingCard.append(img);
    drawingCardDiv.append(drawingCard);
    drawingCardDiv.prepend(deleteButton);
    drawingCardDiv.append(likeCounter);
    drawingDiv.append(drawingCardDiv);
  });
}

function addElementListeners(object, eventType) {
  Object.keys(object).forEach(key => {
    document
      .getElementById(key)
      .addEventListener(eventType, event => object[key](event));
  });
}

function createUser() {
  let heyoh = document.getElementById("heyoH");
  let signInForm = document.getElementById("signIn");
  let postUserForm = document.getElementById("create-user");
  const choiceForm = document.getElementById("choice-container");
  const heart = document.getElementById("heart-gif");
  let signUpForm = document.getElementById("sign-up-container");
  if (createUserAccount) {
    choiceForm.style.display = "none";
    heart.style.display = "none";
    signUpForm.style.display = "block";
    signInForm.style.display = "none";
    heyoh.style.display = "none";
    document.getElementById("additionalSignUp").style.display = "none";
  }
  postUserForm.addEventListener("submit", event => verifyUser(event));
}

function verifyUser(event) {
  event.preventDefault();
  let userNameInput = document.getElementById("user-name-value").value;
  let usernameInput = document.getElementById("username-value").value;
  if (usernameInput == "" || userNameInput == "") {
    alert("please fill out the form to continue");
    document.getElementById("user-name-value").value = "";
    document.getElementById("username-value").value = "";
  } else if (
    allUsers.filter(user => user.username == usernameInput).length > 0
  ) {
    alert("This username has already been taken");
    document.getElementById("user-name-value").value = "";
    document.getElementById("username-value").value = "";
  } else {
    postUser(usernameInput, userNameInput);
  }
}
function postUser(usernameInput, userNameInput) {
  fetch(`${API_ROOT}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: userNameInput,
      username: usernameInput
    })
  })
    .then(response => response.json())
    .then(json => {
      currentUser = json;

      renderUserProfile(currentUser);
    });
}

function editProfile(event) {
  event.preventDefault();
  document.getElementById("edit-user-profile").style.display = "block";
  document.getElementById("user-profile").style.display = "none";
  let deleteAccount = document.getElementById("delete-account");
  deleteAccount.addEventListener("click", event => deleteUser(event));
  let update = document.getElementById("update-username");
  update.addEventListener("submit", event => updateUsername(event));
}
function deleteUser(event) {
  event.preventDefault();
  fetch(`${API_ROOT}users/${currentUser.username}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      window.location.reload();
    });
}

function updateUsername(event) {
  event.preventDefault();
  let newUsername = document.getElementById("new-username-value").value;
  if (newUsername == "") {
    alert("please enter a username");
  } else if (allUsers.filter(user => user.username == newUsername).length > 0) {
    alert("This username has already been taken");
  } else {
    fetch(`${API_ROOT}users/${currentUser.username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ username: newUsername, name: currentUser.name })
    })
      .then(response => response.json())
      .then(json => {
        currentUser = null;

        currentUser = json;
        document.getElementById("edit-user-profile").style.display = "none";
        document.getElementById("user-drawings-container").innerHTML = "";

        renderUserProfile(currentUser);
      });
  }
}

function logout(event) {
  event.preventDefault();
  window.location.reload();
}

function loadCanvas(event) {
  event.preventDefault();
  let canvas = document.getElementById("canvas");
  let draw = document.getElementById("draw");
  draw.style.backgroundImage = null;
  const ctx = draw.getContext("2d");
  ctx.clearRect(0, 0, draw.width, draw.height);

  canvas.style.display = "block";
  document.getElementById("user-profile").style.display = "none";
  let button = document.getElementById("saveButton");
  if (button.getAttribute("clicked") === null) {
    button.addEventListener("click", event => saveDrawing(event));
  }
}

function saveDrawing(event) {
  let button = document.getElementById("saveButton");
  if (button.getAttribute("clicked") === null) {
    button.setAttribute("clicked", "true");
  }
  let selectBar = document.getElementById("selectBar");

  let canvas = document.getElementById("draw");
  let dataURL = canvas.toDataURL();

  fetch(`${API_ROOT}drawings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user_id: currentUser.id,
      challenge_id: selectBar.value,
      canvas_url: dataURL
    })
  })
    .then(response => response.json())
    .then(json => {
      newDrawing = json;

      saveDrawingToUser(newDrawing);
    });
}

function saveDrawingToUser(newDrawing) {
  let canvas = document.getElementById("canvas");

  canvas.style.display = "none";

  currentUserDrawings.push(newDrawing);

  document.getElementById("user-drawings-container").innerHTML = "";

  renderUserProfile(currentUser);
}

function deleteDrawing(event) {
  event.preventDefault();

  const drawingId = event.target.id;
  fetch(`${API_ROOT}drawings/${drawingId}`, {
    method: "DELETE"
  }).then(response => console.log(response));
  let drawing = currentUserDrawings.findIndex(
    drawing => drawing.id == drawingId
  );
  currentUserDrawings.splice(drawing);
  document.getElementById("user-drawings-container").innerHTML = "";
  renderUserProfile(currentUser);
}
