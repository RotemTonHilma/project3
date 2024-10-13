function toApp() {
    document.getElementById("container").innerHTML = "";
    //clone template
    let appTemp = document.getElementById("app");
    let appClone = appTemp.content.cloneNode(true);
    container.appendChild(appClone);

    //change id
    let logOutBtn = container.querySelector("#inactiveLogOut");
    logOutBtn.id = "logOut";
    let ul = container.querySelector("#inactiveToDoList");
    ul.id = "toDoList";
    let input = container.querySelector("#inactiveTodo");
    input.id = "todoInput";

    //add event listener
    logOutBtn.addEventListener("click", logOut);
}

function logOut() {
    localStorage.setItem("loggedUsers", JSON.stringify({}));

    showLogin();
}

function addTask() {
    let currrentUser = JSON.parse(localStorage.getItem("loggedUsers"));
    let userTDList = currrentUser.todolist;

    let task = {
        "content": document.querySelector("#todoInput").value,
        "done": false
    }
    //update in loggedUsers
    userTDList.push(task);
    currrentUser.todolist = userTDList;
    localStorage.setItem("loggedUsers", JSON.stringify(currrentUser));

    //update in users array
    let users = JSON.parse(localStorage.getItem("users"));
    let userFromArr = users.find(user => hasName(user, currrentUser.username));
    userFromArr.todolist = userTDList;
    localStorage.setItem("users", JSON.stringify(users));

}

