var spawn = require('child_process').spawn;
var configs = require('./configs');
var arecord;

/**
Arm the mic, ready to record when control keys selected.
@param {Object} recordControls Object which controls start, stop and file properties
@param {function} callback Function to be executed once recording is stopped.
*/
function arm(recordControls, callback) {
  var stdin = process.stdin;
  // without this, we would only get streams once enter is pressed
  stdin.setRawMode(true);
  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  stdin.resume();
  // i don't want binary, do you?
  stdin.setEncoding('utf8');

  // on any data into stdin
  stdin.on('data', function(key) {
    // ctrl-c ( end of text )
    if (key === '\u0003') {
      process.exit();
    }
    //If user has pressed start recording key, record to target file
    else if (key === recordControls.startKey) {
      _recordSpeech(recordControls.fileName);
    }

    //If user has pressed stop recording key, stop the recording and call provided callback
    else if (key === recordControls.stopKey) {
      _endRecording();
      if (callback) {
        callback();
      }
    }

  });


}
/**
Records audio and saves to target location
@param {String} fileLocation Path to save audio file to
*/
function _recordSpeech(fileLocation) {
  arecord = spawn('arecord', [/*'-fcd'*/ '-r ' + configs.audioRate, fileLocation]);
  arecord.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  arecord.stderr.on('data', function(data) {
    console.log('data: ' + data);
  });

  arecord.on('close', function(code) {
    console.log('Finished recording');
  });
}

/*
Send a kill signal to recording process
*/
function _endRecording() {
  arecord.kill('SIGINT');
}

module.exports = {
  arm: arm
};
