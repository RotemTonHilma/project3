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
        alert("user array already exists");
    }
}
setUsersArrReq.send();

/*set up users
//if (!localStorage.getItem("users"))
    //localStorage.setItem("users", JSON.stringify([{ username: "adi", password: "123", todolist: [] }]))
*/

//set up looged users
const setLoggedUsersArrReq = new Fajax();
setLoggedUsersArrReq.open("POST", "ourserver/api/loggedUsers");
setLoggedUsersArrReq.onload = function () {
    if (setLoggedUsersArrReq.status !== 200) {
        alert("loggedUser obj already exists");
    }
}
setLoggedUsersArrReq.send();

/*set up looged users
if (!localStorage.getItem("loggedUsers"))
    localStorage.setItem("loggedUsers", JSON.stringify({}))
*/

//collect login info
function handleLogChange() {
    let logFormInput = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }
    return logFormInput;
}

//checks: add user
const adduserreq = new Fajax();
adduserreq.open("POST", "ourserver/api/users/newUser", JSON.stringify({ "username": "newuesr", "password": "1234" }));
adduserreq.onload = function () {
    if (this.status !== 200) {
        alert()
    }

}

//add current user info to local storage
function onLogSubmit() {
    let inputInfo = handleLogChange();
    /*let users = JSON.parse(localStorage.getItem("users"))*/
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
                addCurrentUserInfoReq.open("PUT", "ourserver/api/loggedUsers", JSON.stringify(inputInfo));
                addCurrentUserInfoReq.onload = function () {
                    if (addCurrentUserInfoReq.status !== 200) {
                        alert("try to log out");
                    }
                    if (addCurrentUserInfoReq.status == 200) {

                        // localStorage.setItem("loggedUsers", JSON.stringify(loggeduser));
                        toApp();
                    }
                }
            }
            addCurrentUserInfoReq.send();
        }
    }
    getUsersArrReq.send();


}

//validate user log in
function checkLogIn(user, input) {
    return user.username === input.username && input.password === user.password;
}







