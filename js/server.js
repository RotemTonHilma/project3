function server(message) {
    //sort by method
    if (message.method === "GET") {

        //get users array request
        if (message.url === "ourserver/api/users") {
            //check if users array exists
            if (!returnUsers()) message.status = 400;
            else {
                message.status = 200;
                message.responseText = JSON.stringify(returnUsers());
            }
        }

        //get user from array with username request
        if (message.url.includes("users/")) {
            let username = message.url.slice(20);

            //check if a user with this name exists
            if (!returnIfUsername(username)) message.status = 400;
            else {
                message.status = 200;
                message.responseText = JSON.stringify(returnIfUsername(username));
            }
        }

        //
        if (message.url === "ourserver/api/loggedUsers") {
            //check if exists
            if (!returnloggedUser()) message.status = 400;

        }





    }
}

if (message.method === "DELETE") {

    //delete loggedUser 
    if (message.url === "ourserver/api/loggedUsers") {
        //check if loggedUser empty or exists
        if (!returnloggedUser() || unparsedLoggedUser()==="" ) message.status = 400;
        else {
            message.status = 200;
            emptyLoggedUser();
        }
    }
    //remove loggedUser task
    if (message.url.includes("loggedUsers/todolist")) {
        //check if task empty
        //if todolist exsist 
        if (!returnLoggedUserTodolist() || unparsedLoggedUserTodolist()==="") message.status = 400;
        else {
            let currrentUser = returnloggedUser();
            let idOfDeletedTask = currrentUser.todolist.id;
            message.status = 200;
            removeTask(idOfDeletedTask);
        }
    }

    
}

if (message.method === "PUT") {
    //add loggedUser 
    if (message.url === "ourserver/api/loggedUsers") {
        //check if loggedUser full or exists
        if (!returnloggedUser() || !unparsedLoggedUser()==="" ) message.status = 400;
        else {
            let ObjCurrrentUser = JSON.parse(message.data);
            message.status = 200;
            addLoggeduser(ObjCurrrentUser);
        }
    }
}