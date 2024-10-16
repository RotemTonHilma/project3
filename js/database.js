//post
function createUsers() {
    localStorage.setItem("users", JSON.stringify([]));
}
//post
function createLoggedUsers() {
    localStorage.setItem("loggedUsers", JSON.stringify({}));
}
//get
function returnUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

//get
function returnIfUsername(usermane) {
    let users = returnUsers();
    let loggeduser = users.find(user => checkIfUsername(user, usermane));
    return loggeduser;
}

function checkIfUsername(user, input) {
    return user.username === input;
}
//post
function addUsers(user) {
    let users = returnUsers();
    localStorage.setItem("users", JSON.stringify([...users, user]));
}
//put
function addLoggeduser(user) {
    localStorage.setItem("loggedUsers", JSON.stringify(user));
}


function setUserArray(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
}
//delete
function emptyLoggedUser() {
    localStorage.setItem("loggedUsers", JSON.stringify({}));
}
//get
function returnloggedUser() {
    return JSON.parse(localStorage.getItem("loggedUsers"));
}

function unparsedLoggedUser() {
    return localStorage.getItem("loggedUsers");
}

function setNewTaskArr(userArr, username, newToDoList) {

    for (let user of userArr) {
        if (user.username === username) {
            user.todolist = newToDoList;
            break;
        }
    }
}
//post
function addNewTask(taskText) {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;

    //find max id
    let max = -Infinity;
    for (let task of userTDList) {
        if (task.id > max) max = task.id;
    }
    let nextID = max > 0 ? max + 1 : 1;

    let task = {
        "content": taskText,
        "done": false,
        "id": nextID
    }

    //update in loggedUsers
    userTDList.push(task);
    currrentUser.todolist = userTDList;
    addLoggeduser(currrentUser);

    //update in users array
    let users = returnUsers();
    setNewTaskArr(users, currrentUser.username, userTDList);
    setUserArray(users);
}
//delete
function removeTask(taskID) {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;
    let users = returnUsers();

    let newUserTDList = userTDList.filter(task => task.id != taskID)

    setNewTaskArr(users, currrentUser.username, newUserTDList);
    setUserArray(users);

    currrentUser.todolist = newUserTDList;
    addLoggeduser(currrentUser);

}

//get
function returnLoggedUserTodolist() {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;
    return userTDList;

}

function unparsedLoggedUserTodolist() {
    let currrentUser = returnloggedUser();
    let userTDList = currrentUser.todolist;
    return JSON.stringify(userTDList);
}