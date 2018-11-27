module.exports = function(io) {
  var users = [];
  var notesData = [];
  var questions = [];
  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)
  mtg.on("connection", function(socket) {
    var room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client

    socket.join(room);
    socket.on("update text", text => {
      console.log(text);
      console.log("Meeting " + room + " updated with: ", text);

      //can we update the content of the database here?
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", function(question) {
      socket.question = question;
      console.log("socket.question", socket.question);
      questions.push({ name: question, id: socket.id });
      console.table(questions);
      mtg.to(room).emit("question", questions);
    });

    //get username from userData, attach it to socket
    //push it to users array
    //send new array back to client
    socket.on("update-users", nickname => {
      if (questions.length > 0) {
        mtg.to(room).emit("questions", questions);
      }
      socket.nickname = nickname;
      console.log("socket.nickname", socket.nickname, socket.id);
      users.push({ name: nickname, id: socket.id });
      console.log(socket.nickname + " has joined meeting " + room);
      console.log(users);
      mtg.to(room).emit("update-users", users);
    });

    //get id from socket disconnect
    //filter out that socket
    //send new array back to client
    socket.on("disconnect", () => {
      console.log(socket.id + "has disconnected");
      let newUsers = users.filter(user => user.id !== socket.id);
      users = newUsers;
      console.table("newUsers", newUsers);
      console.log("users", users);
      mtg.to(room).emit("update-users", users);
      socket.leave(room);
      console.log("user disconnected");
    });
  });
};
