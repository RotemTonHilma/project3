function toSignUp() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let signUpTemp = document.getElementById("sign-up");
    let signUpClone = signUpTemp.content.cloneNode(true);
    container.appendChild(signUpClone);

    //change ids
    let submitSignUpBtn = container.querySelector("#inactiveSubmitSignUp");
    submitSignUpBtn.id = "submitSignUp";

    let toLogInBtn = container.querySelector("#inactiveToLogIn");
    toLogInBtn.id = "toLogIn";

    //add event listeners
    submitSignUpBtn.addEventListener("click", onSignSubmit);
    toLogInBtn.addEventListener("click", showLogin);
}

//collect sign up info
function handleSUChange() {
    let suFormInput = {
        username: document.getElementById("usernameSU").value,
        password: document.getElementById("passwordSU").value,
    }
    return suFormInput;
}

//add to users array
function onSignSubmit() {
    //search if there is a user with this username
    let inputInfo = handleSUChange();
    // let users = JSON.parse(localStorage.getItem("users"))
    const getUsersArrReq = new Fajax();
    getUsersArrReq.open("GET", "ourserver/api/users");
    getUsersArrReq.onload = function () {
        if (getUsersArrReq.status !== 200) {
            alert("user array doesn't exist");
        }
        if (getUsersArrReq.status == 200) {
            let users = JSON.parse(this.responseText);
            //xoxo adi
            let newUser = {
                username: inputInfo.username,
                password: inputInfo.password,
                todolist: []
            }
            //add newUser request
            const addCurrentUserToUsersReq = new Fajax();
            addCurrentUserToUsersReq.open("POST", "ourserver/api/users/new", JSON.stringify(newUser));
            addCurrentUserToUsersReq.onload = function () {
                if (addCurrentUserToUsersReq.status !== 200) {
                    alert("username taken");
                }
                else {
                    const addCurrentUserInfoReq = new Fajax();
                    addCurrentUserInfoReq.open("PUT", "ourserver/api/loggedUsers", JSON.stringify(newUser));
                    addCurrentUserInfoReq.onload = function () {
                        if (addCurrentUserInfoReq.status !== 200) {
                            alert("try to log out");
                        }
                        if (addCurrentUserInfoReq.status == 200) {
                        }
                    }
                    addCurrentUserInfoReq.send();
                    toApp();
                }
            }
            addCurrentUserToUsersReq.send();
        }

    }
    getUsersArrReq.send();

}
