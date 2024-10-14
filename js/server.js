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