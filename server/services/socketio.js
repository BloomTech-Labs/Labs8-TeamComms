module.exports = function(io) {
  // io.on("connection", function(socket) {
  //   console.log("New client connected, id " + socket.id);
  //   // just like on the client side, we have a socket.on method that takes a callback function
  //   socket.on("change color", color => {
  //     // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
  //     // we make use of the socket.emit method again with the argument given to use from the callback function above
  //     console.log("Color Changed to: ", color);
  //     io.sockets.emit("change color", color);
  //   });
  //   let tempArray = [];
  //   socket.on("update text", text => {
  //     tempArray.push(text);
  //     console.log(text);
  //     // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
  //     // we make use of the socket.emit method again with the argument given to use from the callback function above
  //     console.log("Document updated with: ", text);
  //     io.sockets.emit("update text", text);
  //   });

  //   // disconnect is fired when a client leaves the server
  //   socket.on("disconnect", () => {
  //     socket.removeAllListeners();
  //     console.log("user disconnected");
  //   });
  // });

  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)
  mtg.on("connection", function(socket) {
    var room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client

    socket.join(room);
    console.log("user joined room #" + room);

    socket.on("update text", text => {
      console.log(text);
      console.log("Meeting " + room + " updated with: ", text);

      //can we update the content of the database here?
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", function(msg) {
      //hasn't been tested, but front-end should be able to pass a question to this socket.on,
      //and it will return the question to all users in the room. Ideally this will also update the questions on the database somehow?
      mtg.to(room).emit("question", msg);
    });

    socket.on("disconnect", function() {
      socket.leave(room);
      console.log("user disconnected");
    });
  });
};
