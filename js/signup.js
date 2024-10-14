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
    let users = JSON.parse(localStorage.getItem("users"))
    let userWithInputName = users.find(user => hasName(user, inputInfo.username));
    if (userWithInputName === undefined) {//if the name isn't taken
        let newUser = {
            username: inputInfo.username,
            password: inputInfo.password,
            todolist: []
        }
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedUsers", JSON.stringify(newUser));
        toApp();
    }
    else alert("username taken");
}
