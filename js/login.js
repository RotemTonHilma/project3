document.addEventListener("DOMContentLoaded", showLogin);
const container = document.getElementById("container");

function showLogin() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let logInTemp = document.getElementById("log-in");
    let LogInClone = logInTemp.content.cloneNode(true);
    container.appendChild(LogInClone);

    //change ids
    let submitLogInBtn = container.querySelector("#inactiveSubmitLogIn");
    submitLogInBtn.id = "submitLogIn";

    let toSignUpBtn = container.querySelector("#inactiveToSignUp");
    toSignUpBtn.id = "toSignUp";

    //add event listeners
     submitLogInBtn.addEventListener("click", onLogSubmit);
    // toSignUpBtn.addEventListener("click", toSignUp);
}

//set up users
if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify([]))

//set up looged users
if (!localStorage.getItem("loggedUsers"))
    localStorage.setItem("loggedUsers", JSON.stringify({}))

//collect login info
function handleLogChange() {
    let logFormInput = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }
    return logFormInput;
}

 //add current user info to local storage
function onLogSubmit() {
    let users = JSON.parse(localStorage.getItem("users"))
    console.log(users);
    let loggeduser = users.find(user=>checkLogIn(user));

    let loggedUsers = JSON.parse(localStorage.getItem("loggedUsers"));
    //loggeduser = logFormInput;
        console.log(loggedUsers);
        localStorage.setItem("loggedUsers", loggedUsers);
    
}

//validate user log in
function checkLogIn(user) {
    return user.username === logForm.username && logForm.password === user.password;
  }


  

 
    

