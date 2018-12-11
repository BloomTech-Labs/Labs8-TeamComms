const User = require("../models/UserModel"); //Model
const Convo = require("../models/ConvoModel"); //Model
const LiveMeeting = require("../models/LiveMeetingModel");

module.exports = async function(io) {
  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)

  mtg.on("connection", async function(socket) {
    let room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client
    socket.join(room);
    let liveMeeting = await LiveMeeting.findOne({ meeting: room });
    if (liveMeeting.notes.length > 0) {
      mtg.adapter.rooms[room].text = liveMeeting.notes;
    }
    if (!mtg.adapter.rooms[room].questions) {
      mtg.adapter.rooms[room].questions = liveMeeting.questions;
    }
    if (mtg.adapter.rooms[room].text) {
      mtg.to(room).emit("update text", mtg.adapter.rooms[room].text);
    }
    mtg.to(room).emit("question", mtg.adapter.rooms[room].questions);

    socket.on("update text", text => {
      //can we update the content of the database here? TODO
      mtg.adapter.rooms[room].text = text;
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", function(question) {
      mtg.adapter.rooms[room].questions.push({
        question: question,
        socket_id: socket.id,
        displayName: socket.displayName
      });
      mtg.to(room).emit("question", mtg.adapter.rooms[room].questions);
    });
    //get username from userData, attach it to socket
    //push it to users array
    //send new array back to client
    socket.on("update-users", displayName => {
      if (mtg.adapter.rooms[room].length === 1) {
        mtg.adapter.rooms[room].attended = [];
        mtg.adapter.rooms[room].users = [];
        mtg.adapter.rooms[room].users.push({
          displayName: displayName,
          id: socket.id
        });
        mtg.adapter.rooms[room].attended.push({
          displayName: displayName,
          id: socket.id
        });
      } else {
        mtg.adapter.rooms[room].attended.push({
          displayName: displayName,
          id: socket.id
        });
        mtg.adapter.rooms[room].users.push({
          displayName: displayName,
          id: socket.id
        });
      }

      mtg.to(room).emit("update-users", mtg.adapter.rooms[room].users);
    });

    //get id from socket disconnect
    //filter out that socket
    //send new array back to client
    socket.on("disconnect", () => {
      let newList;
      if (mtg.adapter.rooms[room] && mtg.adapter.rooms[room].users) {
        mtg.adapter.rooms[room].users = mtg.adapter.rooms[room].users.filter(
          user => {
            return user.id !== socket.id;
          }
        );
        newList = mtg.adapter.rooms[room].users;
      } else {
        newList = [];
      }
      mtg.to(room).emit("update-users", newList);
    });

    socket.on("finalize", async () => {
      if (!mtg.adapter.rooms[room].questions) {
        mtg.adapter.rooms[room].questions = null;
      }
      if (!mtg.adapter.rooms[room].text) {
        mtg.adapter.rooms[room].text = "";
      }
      await LiveMeeting.findByIdAndUpdate(
        liveMeeting._id,
        {
          questions: mtg.adapter.rooms[room].questions,
          notes: mtg.adapter.rooms[room].text,
          attended: mtg.adapter.rooms[room].attended
        },
        { new: true }
      ).exec((err, confirm) => {
        if (err) {
          console.log(err);
        } else {
          mtg.to(room).emit("finalize");
        }
      });
    });
  });
};
