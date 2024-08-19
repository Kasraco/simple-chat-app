var historyContainer = document.getElementById("history");
var newMessageform = document.getElementById("new-message-form");
var roomform = document.getElementById("room-form");

newMessageform.addEventListener("submit", onSubmitNewMessage);
roomform.addEventListener("submit", joinForm);

var room;
var socket = io();
socket.on("connect", function () {
  addMessageToHistory("you are connect with id " + socket.id);
});

socket.on("servermessage", function (message) {
  addMessageToHistory(message);
});

function addMessageToHistory(message) {
  const div = document.createElement("div");
  div.innerHTML = message;
  historyContainer.appendChild(div);
}

function onSubmitNewMessage(e) {
  e.preventDefault();
  const message = e.target.elements["message"];
  addMessageToHistory(message.value);
  socket.emit("newmessage", message.value, room);
  message.value = "";
}

function joinForm(e) {
  e.preventDefault();
  const roomname = e.target.elements["room-name"];

  socket.emit("jontheroom", roomname.value, () => {
    room = roomname.value;
    addMessageToHistory("joined " + roomname.value);
  });
}
