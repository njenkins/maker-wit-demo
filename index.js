#!/usr/bin/node

var mic = require('./mic');
var ledDemo = require('./ledDemo');
var stt = require('./stt');
var allPins = [2,3];
var configs = require('./configs');

var recordControls = {
  startKey: configs.startKey || 'x',
  stopKey: configs.stopKey || 'z',
  fileName: configs.fileName || __dirname + '/recordings/speech.wav'
};

/*
Start by listening for record trigger, whenever recording stops
jump into callback
*/

mic.arm(recordControls, function() {

  //Translate speech to text, then handle response
  stt.interpret(recordControls.fileName)
  .then(function(data) {

    //If there are entities provided in the Wit.ai response
    if (typeof data.entities !== "undefined") {
      var entities = data.entities;

      //See if the entities have intents
      if (typeof entities.intent !== "undefined") {
        var intents = entities.intent;

        //We'll just work with the first matching intent;
        if (intents[0].value == 'lights') {

          //If 'blink' is detected, ignore all on / off detection
          if (typeof entities.blink !== "undefined") {
            ledDemo.blink(500, 2);
          }

          //If an on / off property has been provided
          else if (typeof entities.on_off !== "undefined") {

            //Just use the first
            var desiredState = entities.on_off[0].value;

            //If user has specified 'all lights'
            if (typeof entities.all !== "undefined") {
                ledDemo.changeState(desiredState, allPins);
            }

            //If led pin numbers have been specified
            else if (typeof entities.number !== "undefined") {
              var pinGroup = [];

              //Add all provided pin numbers to new group
              for (var i = 0; i < entities.number.length; i++) {
                pinGroup.push(entities.number[i].value);
              }

              //Change the state of the group
              ledDemo.changeState(desiredState, pinGroup);

            }
          }
        }

        //If the provided intent isn't 'lights'
        else {
          console.log('I dont know what to do with that');
        }
      }

      //If no entities are provided
      else {
        console.log('I dont know what to do with that');
      }
    }
  });
});
