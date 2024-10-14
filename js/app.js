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
    // localStorage.setItem("loggedUsers", JSON.stringify({}));
    const deleteLoggedUsersReq = new Fajax();
    deleteLoggedUsersReq.open("DELETE", "ourserver/api/loggedUsers");
    deleteLoggedUsersReq.onload = function () {
        if (deleteLoggedUsersReq.status !== 200) {
            alert("loggedUser obj doesnt exists or empty");
        }
        else {
            showLogin();
        }
    }
    deleteLoggedUsersReq.send();
}

function addTask() {
    //let currrentUser = JSON.parse(localStorage.getItem("loggedUsers"));
    const getLoggedUsersReq = new Fajax();
    getLoggedUsersReq.open("GET", "ourserver/api/loggedUsers");
    getLoggedUsersReq.onload = function () {
        if (getLoggedUsersReq.status !== 200) {
            alert("loggedUser doesnt exists or empty");
        }
        else{
            let currrentUser = JSON.parse(this.responseText);
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
    }
    getLoggedUsersReq.send();


}

function showTasks() {
    //get containing ul, clear
    let ul = container.querySelector("#toDoList");
    ul.innerHTML = '';

    //let currrentUser = JSON.parse(localStorage.getItem("loggedUsers"));
    const getLoggedUsersReq = new Fajax();
    getLoggedUsersReq.open("GET", "ourserver/api/loggedUsers");
    getLoggedUsersReq.onload = function () {
        if (getLoggedUsersReq.status !== 200) {
            alert("loggedUser doesnt exists or empty");
        }
        else {
            let currrentUser = JSON.parse(this.responseText);
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
    }
    getLoggedUsersReq.send();


}

function deleteTask(taskObj) {
    const deleteTaskReq = new Fajax();
    deleteTaskReq.open("DELETE", "ourserver/api/loggedUsers/todolist");
    deleteTaskReq.onload = function () {
        if (deleteTaskReq.status !== 200) {
            alert("todo list is empty");
        }
    }
    deleteTaskReq.send();
}


