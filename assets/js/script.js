var playerData;
 
function setCurrentZone() {
    var currentUrl = window.location.href;
    if (/\/CORBEL-TP-Web\/(index\.html)?$/.test(window.location.href)) {
        console.log("sa marhc")
        return 0;
    } else {
        let match = currentUrl.match(/\/vues\/.+_(\d+).html/);
        return match.length == 0 ? -1 : match[1]
    }
};

function setSoundSystem() {
    document.getElementById("bgm-audio").muted = false;
    reflectMusicState()
}


window.onload = () => {
    let currentZone = setCurrentZone();
    setSoundSystem()
    // toggleVolume()
    if (reflectMusicState()) {
        document.getElementById("bgm-audio").volume = 0.75;
        document.getElementById("play").onclick = togglePlay;
        document.getElementById("volume").onclick = toggleVolume;
    }
    $("#footprint").click(function(e) {
        toggleDirArrows()
    })
    resizeFonts($('#upper-screen').width())
    // if (isChrome) {
    //     soundCheck()
    // } else {
    //     launchZoneScript()
    // }
}

function reflectMusicState() {
    let audioEl = document.getElementById("bgm-audio");
    let volumeEl = document.getElementById("volume"); 
    let playEl = document.getElementById("play");

    if (audioEl == null) {
        volumeEl.classList.add("no-sound"); playEl.classList.add("no-sound");
        volumeEl.innerHTML = "volume_off"; volumeEl.innerHTML = "pause";
        return false
    } else {
        volumeEl.innerHTML = audioEl.muted ? "volume_off" : "volume_up";
        playEl.innerHTML = !audioEl.paused ? "pause" : "play_arrow";
        return true
    }
}

function toggleVolume() {
    let audioEl = document.getElementById("bgm-audio");
    audioEl.muted = !audioEl.muted;
    reflectMusicState()
}
function togglePlay() {
    document.querySelector(".sound-controls").classList.remove("waiting");

    let audioEl = document.getElementById("bgm-audio");
    audioEl.paused ? audioEl.play() : audioEl.pause()
    reflectMusicState();
}
function launchZoneScript() {
    console.log("bonjour")
}

async function soundCheck() {
    let upper = document.querySelector(".upper-screen"), lower = document.querySelector(".lower-screen");
    upper.classList.add("blurred"); lower.classList.add("blurred")
    
    let waitingScreen = document.createElement("div"); waitingScreen.classList.add("waiting-screen");
    document.getElementById("container").insertBefore(waitingScreen, document.getElementById("container").firstChild)
    await waitForClick();

    upper.classList.remove("blurred"); lower.classList.remove("blurred");
    waitingScreen.remove()
    document.getElementById("bgm-audio").play(); document.getElementById("bgm-audio").muted = false;
    launchZoneScript();
}

function waitForClick() {
    return new Promise(resolve => {
        $(document).click(function(e) {
            resolve("resolved")
        })
    })
}


function toggleDirArrows() {
    document.getElementById("directions").classList.toggle("visible");
}

$( window ).resize(function() {
    resizeFonts($('#upper-screen').width());
  });

function resizeFonts(currSize) {
    [...document.getElementsByClassName("text-big")].forEach(element => {
            element.style.fontSize = `${26 * (currSize/624)}px`
    });
    [...document.getElementsByClassName("text-small")].forEach(element => {
            element.style.fontSize = `${24 * (currSize/ 624)}px`;
            element.style.lineHeight = `${0.9 + (0.25 * (currSize/ 624))}`
    });
    [...document.getElementsByClassName("text-medium")].forEach(element => {
            element.style.fontSize = `${22 * (currSize/ 624)}px`;
    })
    }
