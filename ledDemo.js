var five = require("johnny-five");
var board = new five.Board();

/**
Switches the target led or group to the specified state
@param {string} desiredState The state to switch to
@param {mixed} pinNumber The pin number or an array of pins to be changed
@return {bool} If state changed to 'On' returns true, else returns false
*/
function changeState(desiredState, pinNumber) {

    if(pinNumber){

    // Create a standard `led` component instance
    var led = new five.Leds(pinNumber);

    if (desiredState === 'on') {
      led.on();
      return true;
    }
    else if (desiredState === 'off') {
      led.off();
      return false;
    }
  }

}

/**
Blinks LED(s) at chosen rate
@param {int} rate Rate in ms to blink
@param {mixed} pinNumber The pin number or an array of pins to be changed
*/
function blink(rate, pinNumber) {
    var led = new five.Leds(pinNumber);
    led.blink(rate);
}

module.exports = {
  changeState: changeState,
  blink: blink
};
