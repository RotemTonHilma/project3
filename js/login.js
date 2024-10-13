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
    // submitLogInBtn.addEventListener("click", checkLogIn);
    // toSignUpBtn.addEventListener("click", toSignUp);
}