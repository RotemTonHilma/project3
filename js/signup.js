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