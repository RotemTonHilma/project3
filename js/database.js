function returnUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function setUserArray(arr) {
    localStorage.setitem("users", JSON.stringify(arr));
}

function emptyLoggedUser() {
    localStorage.setItem("loggedUsers", JSON.stringify({}));
}
function returnloggedUser() {
    return JSON.parse(localStorage.getItem("loggedUsers"));
}

function addNewTask(taskText) {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;

    let nextID = userTDList.reduce((total, value) => Math.max(total.id, value.id), -Infinity);

    let task = {
        "content": taskText,
        "done": false,

    }

    //update in loggedUsers
    userTDList.push(task);
    currrentUser.todolist = userTDList;
    addLoggedUser(currrentUser);

    //update in users array
    let users = returnUsers();
    let userFromArr = returnIfUsername(currrentUser.username);
    userFromArr.todolist = userTDList;
    setUserArray(users);
}

function removeTask(taskID) {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;
    let users = returnUsers();
    let userFromArr = returnIfUsername(currrentUser.username);

    let newUserTDList = userTDList.filter(task => task.id != taskID)

    userFromArr.todolist = newUserTDList;
    setUserArray(users);

    currrentUser.todolist = newUserTDList;
    addLoggedUser(users);

}
