//@input Component.AudioComponent[] audioComponents
//@input float intervalSeconds = 1.0 {"label":"Interval (Seconds)"}

var currentIndex = 0;
var isPlaying = false;


if (!script.audioComponents || script.audioComponents.length === 0) {
    print("Error: No audio components assigned.");
    return;
}


function playCurrentAudio() {
    var audio = script.audioComponents[currentIndex];
    if (audio) {
        audio.play(1); // Play once fully
    }


    currentIndex = (currentIndex + 1) % script.audioComponents.length;
}


function loopAudioSequence() {
    if (isPlaying) {
        playCurrentAudio();
        delayedEvent.reset(script.intervalSeconds);
    }
}


var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(loopAudioSequence);


function startSequencer() {
    if (!isPlaying) {
        isPlaying = true;
        currentIndex = 0;
        playCurrentAudio();
        delayedEvent.reset(script.intervalSeconds);
    }
}


function stopSequencer() {
    isPlaying = false;
}

var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(startSequencer);
