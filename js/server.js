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

        //get loggedUsers request
        if (message.url === "ourserver/api/loggedUsers") {
            //check if exists
            if (!returnloggedUser() || unparsedLoggedUser() === '') message.status = 400;
            else {
                message.status = 200;
                message.responseText = JSON.stringify(returnloggedUser());
            }

        }
    }

    if (message.method === "POST") {
        //create users array
        if (message.url === "ourserver/api/users") {
            //check if exists
            if (returnUsers()) message.status = 400;
            else {
                message.status = 200;
                createUsers();
            }
        }

        // add user request
        const addUserRegex = /^ourserver\/api\/users\/[^\/]+$/;
        if (addUserRegex.test(message.url)) {
            //check if user array exists
            if (!returnUsers()) message.status = 400;
            else {
                message.status = 200;
                addUsers();
            }
        }

        //create logged user key
        if (message.url === "ourserver/api/loggedUsers") {
            //check if exists
            if (returnloggedUser()) message.status = 400;
            else {
                message.status = 200;
                createLoggedUsers();
            }
        }

        //add new task request
        if (message.url === "ourserver/api/loggedUsers/todolist") {
            //check if logged user exists, isn't empty
            if (!returnloggedUser() || unparsedLoggedUser() === '') message.status = 400;
            else {
                let newTaskContent = message.data;
                message.status = 200;
                addNewTask(newTaskContent);
            }
        }
    }
}