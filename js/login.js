document.addEventListener("DOMContentLoaded", showLogin);
const container = document.getElementById("container");

function showLogin() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let logInTemp = document.getElementById("log-in");
    let LogInClone = template.content.cloneNode(true);
    container.appendChild(LogInClone);

    //change ids

}