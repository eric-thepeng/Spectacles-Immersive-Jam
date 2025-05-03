//@input Component.AudioComponent[] audioComponents
//@input float intervalSeconds = 1.0 {"label":"Interval (Seconds)"}

var currentIndex = 0;
var isPlaying    = false;
var delayedEvent = null;

/** Play one clip and advance `currentIndex` */
function playCurrentAudio() {
    var audio = script.audioComponents[currentIndex];
    if (audio) { audio.play(1); }

    currentIndex = (currentIndex + 1) % script.audioComponents.length;
}

/** Recurring callback */
function loopAudioSequence() {
    if (!isPlaying) { return; }
    playCurrentAudio();
    delayedEvent.reset(script.intervalSeconds);
}

/** Entry point */
function startSequencer() {
    if (isPlaying || script.audioComponents.length === 0) { return; }

    isPlaying    = true;
    currentIndex = 0;

    // (Re)‑create a *per‑instance* delayed event
    delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(loopAudioSequence);

    playCurrentAudio();
    delayedEvent.reset(script.intervalSeconds);
}

// Fire every time this prefab (or the original object) becomes active
script.createEvent("OnStartEvent").bind(startSequencer);