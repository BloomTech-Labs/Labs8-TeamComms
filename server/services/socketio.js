const User = require("../models/UserModel"); //Model
const Convo = require("../models/ConvoModel"); //Model
const LiveMeeting = require("../models/LiveMeetingModel");

module.exports = async function(io) {
  const mtg = io.of("/meeting"); //creates a new namespace called '/meeting' (has nothing to do with an endpoint, its just how they are named)
  // const newLiveMeeting = new LiveMeeting();
  // newLiveMeeting.save()
  let newLiveMeeting = await LiveMeeting.findById("5bfeeed8a1efa0075076eaf8");

  mtg.on("connection", async function(socket) {
    let room = socket.handshake["query"]["r_var"]; //creates a room with the query string sent over by the client
    socket.join(room);
    let currConvo = await Convo.findById(room);

    if (!currConvo) {
      return "Convo not found";
    }
    console.log(currConvo)

    let questions = currConvo.questions;
    console.log(questions)
    // let questions = currConvo.questions.map(q => {
    //   return {
    //     question: q.question,
    //     displayName: q.inquirer.displayName,
    //     created_at: q.created_at,
    //     socket_id: socket.id
    //   };
    // });
   
    // newLiveMeeting.socket_id = socket.id;
    // newLiveMeeting.meeting = currConvo._id;
    // await newLiveMeeting.save();

    // console.log("NEW LIVE MEETING", newLiveMeeting);
    //currConvo.LiveMeeting.push(liveMeeting_id) USE THIS FOR CONVO REF
    newLiveMeeting.notes = "";
    mtg.to(room).emit("question", newLiveMeeting.questions);
    mtg.to(room).emit("update-users", newLiveMeeting.attendees);
    await newLiveMeeting.save()
    // mtg.to(room).emit("update text", newLiveMeeting.notes)

    socket.on("update text", async text => {
      console.log(text);
      console.log("Meeting " + room + " updated with: ", text);

      //can we update the content of the database here?
      mtg.to(room).emit("update text", text); //updates text to only the individuals currently in the room id of the /meeting namespace
    });

    socket.on("question", async function(question) {
      newLiveMeeting.questions.push({
        question: question,
        socket_id: socket.id,
        displayName: socket.displayName
      });
      await newLiveMeeting.save();
      socket.question = question;
      mtg.to(room).emit("question", newLiveMeeting.questions);
    });

    //get username from userData, attach it to socket
    //push it to users array
    //send new array back to client
    socket.on("update-users", async displayName => {
      if (questions.length > 0) {
        mtg.to(room).emit("questions", questions);
      }
      socket.displayName = displayName;
      newLiveMeeting.attendees.push({
        displayName: displayName,
        id: socket.id
      });
      await newLiveMeeting.save();
      mtg.to(room).emit("update-users", newLiveMeeting.attendees);
    });

    //get id from socket disconnect
    //filter out that socket
    //send new array back to client
    socket.on("disconnect", () => {
      newLiveMeeting.attendees = newLiveMeeting.attendees.filter(user => {
        return user.id !== socket.id;
      });
      mtg.to(room).emit("update-users", newLiveMeeting.attendees);
      socket.leave(room);
      console.log("user disconnected");
    });
  });
};
