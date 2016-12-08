# Voice control for Arduino with Wit.ai and Johnny Five

This project was developed for a demo at the Blue Mountains digital makers group
to highlight how [Wit.ai](https://wit.ai) can be used to add a natural language interface to Arduino projects

## Setup

Grab the project files and navigate to the installed project root
```bash
git clone https://njenkinsau@bitbucket.org/njenkinsau/maker-wit-demo.git && cd maker-wit-demo
```

Install all external dependencies

```bash
npm install
```

This project uses the Wit.ai API for Speech to text converstion and intent extraction. To utilise this you will need to [create an account at Wit.ai](https://wit.ai/getting-started) , generate a new app and obtain the secret key from the app settings page.

Once you have this, update the `witaiKey` property within `configs.js` to the new value.

The `mic.js` module uses [arecord](http://manpages.ubuntu.com/manpages/precise/man1/arecord.1.html) to capture audio from the systems default audio input. Check if you have this installed with

```bash
arecord --version
```




## Configuration
Available configuration options are:

* **witaiKey** : Your Wit.ai app API key
* **witApiVersion** : The version of the Wit API you wish to use
* **audioRate** : The rate your audio should be captured at. Lower audio rates equate to smaller file sizes and faster uploads to the Wit.ai STT service, however accuracy reduces with lower rates.
* **fileLocation** : The location to write your audio recording to prior to speech to text analysis. If not provided, default of `recordings/speech.wav` with be used
* **startKey** : The key which when pressed will start audio capture. If not provided, default of `x` will be used.
* **stopKey** : The key which when pressed will stop audio capture and commence speech to text translation. If not provided, default of `z` will be used.

## Running this application
Inside the project directory run the command `npm start` . To issue a voice command, press the key you have specified as the `startKey` within your config file.

Press the `stopKey` to stop recording and have it send to the Wit.ai API for interpretation.

## Testing
Issuing the command `npm test` will execute the following tests.
* JSHint validation to highlight any javascript errors
* JSCS validation to ensure code meets styling requirements
* All unit tests contained within the `tests` directory
