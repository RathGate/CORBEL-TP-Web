const CURRENTZONE = setCurrentZone();
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
    "If you're looking for the dog, don't worry. Lady Dahlia found him, he's right there waiting for you."]

}

resizeFonts($('#upper-screen').width())
setSoundSystem()


if (CURRENTZONE == 3 || CURRENTZONE == 4 || CURRENTZONE == 7 || CURRENTZONE == 10 || CURRENTZONE == 12 || CURRENTZONE == 14 || CURRENTZONE == 6) {
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


$("#footprint").click(function(e) {
    toggleDirArrows()
})

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
    if (reflectMusicState()) {
        document.getElementById("bgm-audio").volume = 0.75;
        document.getElementById("play").onclick = togglePlay;
        document.getElementById("volume").onclick = toggleVolume;
    }
};

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
        $(".text-container").click(function(e) {
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


