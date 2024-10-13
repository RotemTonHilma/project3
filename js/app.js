function toApp() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let appTemp = document.getElementById("app");
    let appClone = appTemp.content.cloneNode(true);
    container.appendChild(appClone);

    //change id
    let logOutBtn = container.querySelector("#inactiveLogOut");
    logOutBtn.id = "logOut";

    //add event listener
    logOutBtn.addEventListener("click", logOut);
}

function logOut() {
    //epty logged user
    showLogin();
}

function checkLogIn() {

}

function checkSignUp() {

}