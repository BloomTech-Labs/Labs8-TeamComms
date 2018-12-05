const User = require("../models/UserModel"); //Model
const Convo = require("../models/ConvoModel"); //Model
const LiveMeeting = require("../models/LiveMeetingModel");

module.exports = async function(io) {
  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)

  mtg.on("connection", async function(socket) {
    let room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client
    socket.join(room);
    let liveMeeting = await LiveMeeting.findOne({ meeting: room });
    let attendees = liveMeeting.attendees;
    mtg.to(room).emit("question", liveMeeting.questions);

    socket.on("update text", async text => {
      //can we update the content of the database here? TODO
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", async function(question) {
      liveMeeting.questions.push({
        question: question,
        socket_id: socket.id,
        displayName: socket.displayName
      });

      await liveMeeting.save((err, confirm) => {
        if (err) {
          console.log(err);
        } else {
          console.log(confirm);
          mtg.to(room).emit("question", liveMeeting.questions);
        }
      });
    });

    //get username from userData, attach it to socket
    //push it to users array
    //send new array back to client

    socket.on("update-users", async displayName => {
      attendees.push({
        displayName: displayName,
        id: socket.id
      });
      await LiveMeeting.findByIdAndUpdate(
        liveMeeting._id,
        { attendees: attendees },
        (err, meeting) => {
          if (err) {
            console.log(err);
          } else {
            console.log("UPDATE USERS UPDATE SUCCESS", meeting);
            console.log("ATTENDEES INSIDE UPDATE USERS", attendees)
            mtg.to(room).emit("update-users", attendees);
          }
        }
      );
    });

    //get id from socket disconnect
    //filter out that socket
    //send new array back to client
    socket.on("disconnect", async () => {
      console.log(attendees)
      attendees = attendees.filter(user => {
        return user.id !== socket.id;
      });
      console.log("ATTENDEES", attendees)
      await LiveMeeting.findByIdAndUpdate(
        liveMeeting._id,
        { attendees: attendees },
        (err, meeting) => {
          if (err) {
            console.log(err);
          } else {
            console.log("DISCONNECT UPDATE SUCCESS", meeting);
            mtg.to(room).emit("update-users", attendees);
            console.log("user disconnected");
          }
        }
      );
    });

    // mtg.to(room).emit("update-users", attendees);
  });
};
