function returnUsers() {
    return JSON.parse(localStorage.getItem("users"))
}


function returnIfUsername(usermane) {
    let users = returnUsers();
    let loggeduser = users.find(user => checkIfUsername(user, usermane));
    return loggeduser;
}

function checkIfUsername(user, input) {
    return user.username === input.username;
}

function addUsers(user) {
    let users = returnUsers();
    //users.push(user)
    localStorage.setItem("users", JSON.stringify([...users, user]));    

}
function addLoggeduser(user) {
    localStorage.setItem("loggedusers", JSON.stringify(user));    
}

  