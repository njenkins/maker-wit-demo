var request = require('request');
var configs = require('./configs');
var fs = require('fs');
var witUrl = 'https://api.wit.ai/speech?v=' + configs.witApiVersion;
/**
Takes an audio file and sends to Wit.ai for intent / entity extraction
@param {String} fileName Path to the audio file to read.
*/
function interpret(fileName) {
  return new Promise(function(resolve, reject) {
    //Read the target audio file
    fs.readFile(fileName, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        //Post the file data to Wit.ai API
        request.post({
          url: witUrl,
          headers: {
            'Authorization': 'Bearer ' + configs.witaiKey,
            'Content-Type': 'audio/wav',
            'Transfer-encoding': 'chunked'
          },
          body: data

        },
        function(error, response, body) {
          if (error) {
            reject(error);
          }
          else {
            resolve(extractResponse(body));
          }
        });

      }
    });
  });
}

function extractResponse(body) {
  var response = JSON.parse(body);
  console.log(response);
  return response;
}

module.exports = {
  interpret: interpret
};
