import GameData from '../data/gamedata.json' assert { type: 'json' };
const currentZone = 0;

const isChrome = () => {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");

    if (isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false) {
        return true;
    } 
    return false;
}
window.onload = () => {

    // document.getElementById("text-box").innerHTML = "pouet pouet je suis un potit blagueur";
    if (reflectMusicState()) {
        document.getElementById("bgm-audio").volume = 0.75;
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

    if (audioEl == null) {
        volumeEl.classList.add("no-sound"); 
        volumeEl.innerHTML = "volume_off";
        return false
    } else {
        volumeEl.innerHTML = audioEl.muted ? "volume_up" : "volume_off";
        return true
    }
}

function toggleVolume() {
    let audioEl = document.getElementById("bgm-audio");
    audioEl.muted = !audioEl.muted;
    reflectMusicState()
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

function generateDirArrows() { 
    GameData.zones[currentZone].directions.forEach(direction => {
        let newEl = document.createElement("div"); newEl.classList.add("direction-arrow");
        $(newEl).click(function(e) {
            switchPages(`page_${direction.id}.html`)
        });
        newEl.style.top = `${direction.coordinates[0]}%`; newEl.style.left = `${direction.coordinates[1]}%`
        newEl.innerHTML = `<img src="assets/img/arrows/${direction.arrow_type}.png" alt="direction arrow">`
        document.getElementById("directions").appendChild(newEl)
       }
    )
}

function toggleDirArrows() {
    let dirDiv = document.getElementById("directions");
    if (dirDiv.childElementCount == 0) {
        generateDirArrows()
    } else {
        dirDiv.innerHTML = "";
    }
}
function switchPages(page) {
    document.location.href = page;
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