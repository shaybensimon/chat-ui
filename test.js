io = require('socket.io-client')
socket = io("https://spotim-demo-chat-server.herokuapp.com");

var event_name = 'spotim/chat';

socket.on("connect", function() {
  console.log("connected to chat server!");
});

socket.on(event_name, (data) => {
  console.log(data);
});


socket.emit(event_name, {avatar:".",username:"Shay",text: "Hello"}, function(data) {
	console.log("Emitted: ");
	console.log(data);
});



