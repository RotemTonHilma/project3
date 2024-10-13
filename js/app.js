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

    //show current tasks
    showTasks();
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

    //update showing tasks
    showTasks();

}

function showTasks() {
    //get containing ul, clear
    let ul = container.querySelector("#toDoList");
    ul.innerHTML = '';

    let currrentUser = JSON.parse(localStorage.getItem("loggedUsers"));
    let userList = currrentUser.todolist;

    for (let idx in userList) {
        let newLi = document.createElement("li");
        let newP = document.createElement("p");
        newP.textContent = userList[idx].content;
        newP.style.display = "inline";

        let newBtn = document.createElement("button");
        newBtn.textContent = "X";
        newBtn.addEventListener("click", () => { deleteTask(userList[idx]) });
        newBtn.style.display = "inline-block";


        newLi.appendChild(newP);
        newLi.appendChild(newBtn);

        ul.appendChild(newLi);
    }

}

function deleteTask(taskObj) {

}


