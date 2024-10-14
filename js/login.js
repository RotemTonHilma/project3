document.addEventListener("DOMContentLoaded", showLogin);
const container = document.getElementById("container");

function showLogin() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let logInTemp = document.getElementById("log-in");
    let LogInClone = logInTemp.content.cloneNode(true);
    container.appendChild(LogInClone);

    //change ids
    let submitLogIn = container.querySelector("#inactiveSubmitLogIn");
    submitLogIn.id = "submitLogIn";

    let toSignUpBtn = container.querySelector("#inactiveToSignUp");
    toSignUpBtn.id = "toSignUp";

    //add event listeners
    submitLogIn.addEventListener("click", onLogSubmit);
    toSignUpBtn.addEventListener("click", toSignUp);

}

//set up users
if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify([{ username: "adi", password: "123", todolist: [] }]))


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
    let inputInfo = handleLogChange();
    let users = JSON.parse(localStorage.getItem("users"))
    let loggeduser = users.find(user => checkLogIn(user, inputInfo));

    if (loggeduser === undefined) {
        alert("wrong information");
    }

    else {

        localStorage.setItem("loggedUsers", JSON.stringify(loggeduser));
        toApp();
    }

}

//validate user log in
function checkLogIn(user, input) {
    return user.username === input.username && input.password === user.password;
}







