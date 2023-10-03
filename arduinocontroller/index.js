const delay = ms => new Promise(res => setTimeout(res, ms));

let five = require("johnny-five");
let board = new five.Board();

const P1 = 3;
const P2 = 4;
const P3 = 6;
const P4 = 7;
const ENA = 9;
const ENB = 10;

const delayAmount = 3;
var step = 0;

board.on("ready", function() {
  this.pinMode(P1, five.Pin.OUTPUT);
  this.pinMode(P2, five.Pin.OUTPUT);
  this.pinMode(P3, five.Pin.OUTPUT);
  this.pinMode(P4, five.Pin.OUTPUT);
  this.pinMode(ENA, five.Pin.OUTPUT);
  this.pinMode(ENB, five.Pin.OUTPUT);
  this.digitalWrite(ENA, 1);
  this.digitalWrite(ENB, 1);
  this.analogWrite(ENA, 255);
  this.analogWrite(ENB, 255);

  animate();

  // this.loop(0, () => {
  //   updateStepper();
  // });

  // updateStepper();
  // this.wait(delayAmount, function() {
  //   updateStepper();
  // });
});

async function animate() {
  updateStepper();
  await delay(delayAmount);
  animate();
}

function updateStepper() {
  switch (step) {
    case 0:
      board.digitalWrite(P1, 0);
      board.digitalWrite(P2, 1);
      board.digitalWrite(P3, 1);
      board.digitalWrite(P4, 0);
      break;
    case 1:
      board.digitalWrite(P1, 0);
      board.digitalWrite(P2, 1);
      board.digitalWrite(P3, 0);
      board.digitalWrite(P4, 1);
      break;
    case 2:
      board.digitalWrite(P1, 1);
      board.digitalWrite(P2, 0);
      board.digitalWrite(P3, 0);
      board.digitalWrite(P4, 1);
      break;
    case 3:
      board.digitalWrite(P1, 1);
      board.digitalWrite(P2, 0);
      board.digitalWrite(P3, 1);
      board.digitalWrite(P4, 0);
      break;
  }
  step++;
  if (step >= 4) step = 0;
}
