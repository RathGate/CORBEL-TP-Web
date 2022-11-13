const CURRENTZONE = setCurrentZone();

function loadScreen() {
    resizeFonts($('#upper-screen').width())
    setSoundSystem()
    
    $("#footprint").click(function(e) {
        toggleDirArrows()
    })
    
    if (npcZones.includes(parseInt(CURRENTZONE))) {
        if (CURRENTZONE == 4) {
            setTimeout(function() {
                document.querySelector(".text-container").classList.toggle("hidden");
                document.querySelector(".text-char").classList.toggle("hidden");
                readText(textLines[CURRENTZONE]);
            }, 1500)
        } else {
            document.querySelector(".text-container").classList.toggle("hidden");
            document.querySelector(".text-char").classList.toggle("hidden");
            readText(textLines[CURRENTZONE]);
        }
        
    } else {
        closeTextBox()
    }
}

// Defines current zone based on page URL.
function setCurrentZone() {
    var currentUrl = window.location.href;
    if (/\/CORBEL-TP-Web\/(index\.html)?$/.test(window.location.href)) {
        return 0;
    } else {
        let match = currentUrl.match(/\/vues\/.+_(\d+).html/);
        return match.length == 0 ? -1 : match[1]
    }
};

// Base sound system setting on page launch.
function setSoundSystem() {
    document.getElementById("bgm-audio").muted = false;
    if (reflectMusicState()) {
        document.getElementById("bgm-audio").volume = 0.75;
        document.getElementById("play").onclick = togglePlay;
        document.getElementById("volume").onclick = toggleVolume;
    }
};

// Ajusts sound icons based on audio element's state.
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

// Toggles both volume-up/mute pause/play states.
function toggleVolume() {
    console.log("hhh")
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

// Displays or not the direction arrows.
function toggleDirArrows() {
    document.getElementById("directions").classList.toggle("visible");
}

// CSS cannot set font size based on the screen size.
// Therefore, function to resize the main font-sizes based on window size. 
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
};

// Freezes the screen until the users clicks on the div.
function waitForClick() {
    return new Promise(resolve => {
        $(".text-container").click(function(e) {
            resolve("resolved")
        })
    })
};
// 
async function readText(textArr) {
    if (textArr.length != 0) {
        for (let i = 0; i < textArr.length; i++) {
            document.getElementById("text-box").innerText = textArr[i];
            if (i < textArr.length-1) {
                await waitForClick();
            }
        }
        await closeTextBox()
        document.querySelector(".text-char").classList.toggle("hidden");
    }
}

async function closeTextBox() {
    await waitForClick();
    document.querySelector(".footprint").classList.toggle("hidden");
    document.querySelector(".text-container").classList.toggle("hidden");
    document.querySelector(".text-name").classList.remove("hidden");
}

let textLines = {
    3: ["Oh, someone new here! Not a lot of people come here when there's no project red around...",
    "...",
    "What was I saying ?",
    "Anyway, have you seen the lil' cat before the amusement park's gates ? That's Claudia. She's fat, you should see her."],
    4: ["Hey, stranger ! Don't you think this village is curiously empty ? Where did all the villagers go ?",
    "You are gazing at the beautiful and clairvoyant Mamie Mystère, guide to the puzzled puzzlers!",
    "This is my shack, though the creator wanted it to be a dev room. I was supposed to give you the answers you would seek to solve the game.",
    "But she experienced anxiety issues, that's why everything here seems so empty. I hope you're still having some fun testing it out!",
    "Anyway, if you haven't found the dog yet, I heard he is having quite a nice time in the manor...",
    "You should get going! Have a nice day, stranger! Oh, and don't go to that weird room after the clock tower. Just sayin'."],
    6: ["Oh, a cat. Psstpsst!",
    "Wait, that's not what I should be doing."],
    7: ["Hi, welcome! Are you looking for the dog ? I saw him, but I can't really remember where it went.",
    "Have you tried asking Mamie Mystère? She's a bit odd, but she somehow knows everything that's happening here.",
    "Her house isn't easy to find, but I can tell you it's around the village square. If you've already seen this village before.",
    "Have a nice day !"],
    10: ["Have you seen what's happening in the village down the lookout point? There's a lot of noise coming from there.",
    "I can't really check it out myself, I fear the kids will steal my products while I'm away.",
    "Fireworks maybe ? In broad daylight ?",
    "Those kids nowadays..."],
    12: ["... Oh.",
    "I... didn't expect to see someone here. Don't tell anyone that you saw me.",
    "Please."],
    14: ["Do you need some help to cross the river ? I'm the one in charge here.",
    "If you're looking for the dog, don't worry. Lady Dahlia found him, he's right there waiting for you."],
};

var npcZones = [3, 4, 6, 7, 10, 12, 14];
console.log()
loadScreen()