var currentIndex = 0;
var isPlaying = false;

if (!script.audioComponents || script.audioComponents.length === 0) {
    print("Error: No audio components assigned.");
    return;
}

function playAudio() {
    var audio = script.audioComponents[currentIndex];
    if (audio) {
        audio.play(1);
    }
    currentIndex = (currentIndex + 1) % script.audioComponents.length;
}

function loopAudio() {
    if (isPlaying) {
        playAudio();
        delayedEvent.reset(script.intervalSeconds);
    }
}

// delay
var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(loopAudio);

script.createEvent("TurnOnEvent").bind(function() {
    isPlaying = true;
    currentIndex = 0;
    playAudio();
    delayedEvent.reset(script.intervalSeconds);
});
