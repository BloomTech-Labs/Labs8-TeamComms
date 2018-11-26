module.exports = function(io) {
    io.on("connection", function(socket) {
      console.log("New client connected, id " + socket.id);
      // just like on the client side, we have a socket.on method that takes a callback function
      socket.on("change color", color => {
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log("Color Changed to: ", color);
        io.sockets.emit("change color", color);
      });
      let tempArray = [];
      socket.on("update text", text => {
        tempArray.push(text);
        console.log(text);
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log("Document updated with: ", text);
        io.sockets.emit("update text", text);
      });
  
      // disconnect is fired when a client leaves the server
      socket.on("disconnect", () => {
        socket.removeAllListeners();
        console.log("user disconnected");
      });
    });
  };
  