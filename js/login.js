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
const setUsersArrReq = new Fajax();
setUsersArrReq.open("POST", "ourserver/api/users");
setUsersArrReq.onload = function () {
    if (setUsersArrReq.status !== 200) {
        // alert("user array already exists");
    }
}
setUsersArrReq.send();

//set up looged users
const setLoggedUsersArrReq = new Fajax();
setLoggedUsersArrReq.open("POST", "ourserver/api/loggedUsers");
setLoggedUsersArrReq.onload = function () {
    if (setLoggedUsersArrReq.status !== 200) {
        // alert("loggedUser obj already exists");
    }
}
setLoggedUsersArrReq.send();

//collect login info
function handleLogChange() {
    let logFormInput = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }
    return logFormInput;
}


//add current user info
function onLogSubmit() {
    let inputInfo = handleLogChange();
    const getUsersArrReq = new Fajax();
    getUsersArrReq.open("GET", "ourserver/api/users");
    getUsersArrReq.onload = function () {
        if (getUsersArrReq.status !== 200) {
            alert("user array doesn't exist");
        }
        if (getUsersArrReq.status == 200) {
            let users = JSON.parse(this.responseText);
            let loggeduser = users.find(user => checkLogIn(user, inputInfo));

            if (loggeduser === undefined) {
                alert("wrong information");
            }

            else {
                const addCurrentUserInfoReq = new Fajax();
                addCurrentUserInfoReq.open("PUT", "ourserver/api/loggedUsers", JSON.stringify(loggeduser));
                addCurrentUserInfoReq.onload = function () {
                    if (addCurrentUserInfoReq.status !== 200) {
                        alert("try to log out");
                    }
                    if (addCurrentUserInfoReq.status == 200) {
                        toApp();
                    }
                }
                addCurrentUserInfoReq.send();
            }
        }
    }
    getUsersArrReq.send();


}

//validate user log in
function checkLogIn(user, input) {
    return user.username === input.username && input.password === user.password;
}

//cat audio
function meow(audioFile) {
    new Audio(audioFile).play();
}







