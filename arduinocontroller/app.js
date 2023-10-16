const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// johnny five

let five = require("johnny-five");
let board = new five.Board();
let connection;

const P1 = 9;
const P2 = 10;
const P3 = 11;
const P4 = 12;

// var runStepper = false;
var runStepper = true;

const delayAmount = 3;
var step = 0;

board.on("ready", function() {
  this.pinMode(P1, five.Pin.OUTPUT);
  this.pinMode(P2, five.Pin.OUTPUT);
  this.pinMode(P3, five.Pin.OUTPUT);
  this.pinMode(P4, five.Pin.OUTPUT);

  this.loop(4, () => {
    updateStepper();
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('data', (data) => {
      // runStepper = data > 0;
    });
  });
});

function updateStepper() {
  if (!runStepper) return;

  switch (step) {
    case 0:
      board.digitalWrite(P1, 1);
      board.digitalWrite(P2, 0);
      board.digitalWrite(P3, 0);
      board.digitalWrite(P4, 0);
      break;
    case 1:
      board.digitalWrite(P1, 0);
      board.digitalWrite(P2, 1);
      board.digitalWrite(P3, 0);
      board.digitalWrite(P4, 0);
      break;
    case 2:
      board.digitalWrite(P1, 0);
      board.digitalWrite(P2, 0);
      board.digitalWrite(P3, 1);
      board.digitalWrite(P4, 0);
      break;
    case 3:
      board.digitalWrite(P1, 0);
      board.digitalWrite(P2, 0);
      board.digitalWrite(P3, 0);
      board.digitalWrite(P4, 1);
      break;
  }
  step++;
  if (step > 3) step = 0;
}
