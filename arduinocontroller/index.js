var five = require("johnny-five");
var board = new five.Board();

const delay = ms => new Promise(res => setTimeout(res, ms));

board.on("ready", function() {
  const P1 = 3;
  const P2 = 4;
  const P3 = 6;
  const P4 = 7;
  const ENA = 9;
  const ENB = 10;

  this.pinMode(P1, Pin.OUTPUT);
  this.pinMode(P2, Pin.OUTPUT);
  this.pinMode(P3, Pin.OUTPUT);
  this.pinMode(P4, Pin.OUTPUT);
  this.pinMode(ENA, Pin.OUTPUT);
  this.pinMode(ENB, Pin.OUTPUT);
  this.analogWrite(ENA, 255);
  this.analogWrite(ENB, 255);

  const delayAmount = 3;

  this.loop(0, async function() {
    this.digitalWrite(P1, 0);
    this.digitalWrite(P2, 1);
    this.digitalWrite(P3, 1);
    this.digitalWrite(P4, 0);
    delay(delayAmount);

    this.digitalWrite(P1, 0);
    this.digitalWrite(P2, 1);
    this.digitalWrite(P3, 0);
    this.digitalWrite(P4, 1);
    delay(delayAmount);

    this.digitalWrite(P1, 1);
    this.digitalWrite(P2, 0);
    this.digitalWrite(P3, 0);
    this.digitalWrite(P4, 1);
    delay(delayAmount);

    this.digitalWrite(P1, 1);
    this.digitalWrite(P2, 0);
    this.digitalWrite(P3, 1);
    this.digitalWrite(P4, 0);
    delay(delayAmount);
  });
});
