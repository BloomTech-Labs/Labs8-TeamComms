const User = require("../models/UserModel"); //Model
const Convo = require("../models/ConvoModel"); //Model
const LiveMeeting = require("../models/LiveMeetingModel");

module.exports = async function(io) {
  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)

  mtg.on("connection", async function(socket) {
    let room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client
    socket.join(room);
    let liveMeeting = await LiveMeeting.findOne({ meeting: room });

    console.log(liveMeeting);

    mtg.to(room).emit("question", liveMeeting.questions);
    mtg.to(room).emit("update-users", liveMeeting.attendees);
    // mtg.to(room).emit("update text", liveMeeting.notes)

    socket.on("update text", async text => {
      console.log(text);
      console.log("Meeting " + room + " updated with: ", text);
      //can we update the content of the database here? TODO
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", async function(question) {
      liveMeeting.questions.push({
        question: question,
        socket_id: socket.id,
        displayName: socket.displayName
      });
      await liveMeeting.save();
      socket.question = question;
      mtg.to(room).emit("question", liveMeeting.questions);
    });

    //get username from userData, attach it to socket
    //push it to users array
    //send new array back to client
    socket.on("update-users", async displayName => {
      // if (questions.length > 0) {
      //   mtg.to(room).emit("questions", questions);
      // }
      socket.displayName = displayName;
      liveMeeting.attended.push({
        displayName: displayName,
        id: socket.id
      });

      liveMeeting.attendees.push({
        displayName: displayName,
        id: socket.id
      });
      await liveMeeting.save();
      mtg.to(room).emit("update-users", liveMeeting.attendees);
    });

    //get id from socket disconnect
    //filter out that socket
    //send new array back to client
    socket.on("disconnect", async () => {
      liveMeeting.attendees = liveMeeting.attendees.filter(user => {
        return user.id !== socket.id;
      });
      await liveMeeting.save();
      mtg.to(room).emit("update-users", liveMeeting.attendees);
      socket.leave(room);
      console.log("user disconnected");
    });
  });
};
