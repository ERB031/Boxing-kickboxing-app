const combos = {
  "muay-thai": {
    all: [
      "Teep → Jab → Cross → Lead Elbow",
      "Jab → Cross → Lead Hook → Rear Roundhouse",
      "Rear Knee → Frame → Lead Up Elbow",
      "Lead Hook → Rear Kick → Switch Kick → Cross",
      "Check → Counter Cross → Lead Elbow → Dump",
      "Inside Low Kick → Cross → Rear Knee → Clinch Turn",
      "Long Guard → Teep → Rear Elbow → Sweep",
      "Cross → Lead Body Hook → Rear Kick → Superman Elbow",
    ],
    beginner: [
      "Teep → Jab → Cross",
      "Cross → Lead Hook → Rear Kick",
      "Jab → Cross → Lead Body Kick",
      "Check → Cross → Lead Teep",
      "Double Jab → Rear Kick",
    ],
    intermediate: [
      "Lead Hook → Rear Low Kick → Cross → Lead Teep",
      "Jab → Cross → Lead Elbow → Rear Knee",
      "Cross → Lead Hook → Rear Kick → Switch Knee",
      "Catch Kick → Sweep → Jumping Knee",
    ],
    advanced: [
      "Long Guard → Cross → Lead Up Elbow → Spinning Elbow",
      "Switch Kick → Cross → Lead Elbow → Dump → Soccer Kick",
      "Lead Teep → Cross → Step In Elbow → Spinning Backfist",
      "Clinch Pull → Knee → Elbow → Elbow → Low Kick",
    ],
  },
  kickboxing: {
    all: [
      "Double Jab → Cross → Lead Hook → Low Kick",
      "Jab → Rear Body Kick → Cross → Lead High Kick",
      "Lead Hook → Rear Uppercut → Cross → Switch Kick",
      "Lead Body Hook → Rear Uppercut → Lead Hook → Liver Kick",
      "Cross → Lead Hook → Rear Low Kick → Superman Punch",
    ],
    beginner: [
      "Jab → Cross → Lead Hook",
      "Cross → Lead Hook → Low Kick",
      "Double Jab → Rear Body Kick",
      "Lead Uppercut → Cross → Lead Hook",
    ],
    intermediate: [
      "Lead Hook → Rear Uppercut → Cross → Switch Low Kick",
      "Jab → Cross → Lead Body Hook → Rear Roundhouse",
      "Cross → Lead Hook → Rear Spinning Back Kick",
    ],
    advanced: [
      "Cross → Lead Hook → Rear Wheel Kick",
      "Lead Hook → Rear Uppercut → Cross → Jumping Knee",
      "Jab → Cross → Switch Step High Kick → Superman Punch",
    ],
  },
  mma: {
    all: [
      "Jab → Cross → Level Change → Double Leg",
      "Low Kick → Cross → Collar Tie → Knee",
      "Cross → Lead Hook → Duck Under → Body Lock",
      "Jab → Cross → Elbow → Snatch Single",
      "Lead Uppercut → Cross → Level Change → Clinch Knee",
    ],
    beginner: [
      "Jab → Cross → Level Change",
      "Cross → Lead Hook → Body Lock",
      "Jab → Lead Hook → Single Leg Entry",
    ],
    intermediate: [
      "Cross → Lead Hook → Level Change → Knee",
      "Jab → Cross → Elbow → Body Lock → Knee",
      "Lead Uppercut → Cross → Duck Under → Back Take",
    ],
    advanced: [
      "Low Kick → Superman Punch → Level Change → Lift Finish",
      "Jab → Cross → Spin Elbow → Trip → Ground Strikes",
      "Cross → Lead Hook → Double Leg → Ground & Pound Series",
    ],
  },
};

const focusTempos = {
  power: "65% Intensity",
  speed: "Fast Twitch Mode",
  technique: "Tempo: 80 BPM",
  elbows: "Clinch Range Rhythm",
  defense: "Reactive Counter Flow",
};

const finishers = [
  "20 Burpee Knees",
  "40 Med-Ball Slams",
  "30 Hollow Rock Kicks",
  "1 min Assault Bike Sprints",
  "3 x 30s Battle Ropes",
  "40 Alternating Switch Knees",
  "2 min Heavy Bag Burnout",
];

const voices = [
  "Combo deployed. Stay sharp.",
  "Southpaw stance locked in. Flow now.",
  "Explode on the finisher. No mercy.",
  "Tempo rising. Hit the gas.",
];

const chipGroup = document.querySelector("#focus");
const focusChips = chipGroup.querySelectorAll(".chip");
const roundsRange = document.querySelector("#rounds");
const roundsValue = document.querySelector("#rounds-value");
const generateButton = document.querySelector("#generate-combo");
const comboSequence = document.querySelector("#combo-sequence");
const comboDifficulty = document.querySelector("#combo-difficulty");
const comboTempo = document.querySelector("#combo-tempo");
const comboFinisher = document.querySelector("#combo-finisher");
const playlist = document.querySelector("#playlist");
const saveComboButton = document.querySelector("#save-combo");
const clearPlaylistButton = document.querySelector("#clear-playlist");
const tabs = document.querySelectorAll(".panel__tab");
const toast = document.querySelector("#toast");
const speakButton = document.querySelector("#speak-combo");
const includeConditioning = document.querySelector("#include-conditioning");

let selectedFocus = "power";
let selectedLevel = "all";
let savedCombos = [];

focusChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    focusChips.forEach((ch) => ch.classList.remove("chip--active"));
    chip.classList.add("chip--active");
    selectedFocus = chip.dataset.focus;
    comboTempo.textContent = focusTempos[selectedFocus] ?? "Tempo: Adaptive";
  });
});

roundsRange.addEventListener("input", (event) => {
  roundsValue.textContent = event.target.value;
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tb) => tb.classList.remove("panel__tab--active"));
    tab.classList.add("panel__tab--active");
    selectedLevel = tab.dataset.level;
    triggerComboGeneration();
  });
});

const triggerComboGeneration = () => {
  const style = document.querySelector("#style").value;
  const level = selectedLevel === "all" ? "all" : selectedLevel;
  const pool = combos[style][level] ?? combos[style].all;

  const combo = pool[Math.floor(Math.random() * pool.length)];
  const conditioning = includeConditioning.checked
    ? finishers[Math.floor(Math.random() * finishers.length)]
    : "Cool-down breath work";

  const difficultyMap = {
    beginner: "Foundation",
    intermediate: "Intermediate",
    advanced: "Elite",
    all: "Adaptive",
  };

  comboSequence.textContent = combo;
  comboDifficulty.textContent = difficultyMap[level];
  comboTempo.textContent = focusTempos[selectedFocus] ?? "Tempo: Adaptive";
  comboFinisher.textContent = conditioning;
};

generateButton.addEventListener("click", () => {
  triggerComboGeneration();
  flashToast("Combo updated. Bring the heat.");
});

saveComboButton.addEventListener("click", () => {
  const combo = {
    sequence: comboSequence.textContent,
    meta: comboFinisher.textContent,
  };
  savedCombos.push(combo);
  renderPlaylist();
  flashToast("Combo saved to playlist.");
});

clearPlaylistButton.addEventListener("click", () => {
  savedCombos = [];
  renderPlaylist();
  flashToast("Playlist cleared.");
});

playlist.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const index = Number(event.target.dataset.index);
    savedCombos.splice(index, 1);
    renderPlaylist();
    flashToast("Combo removed.");
  }
});

const renderPlaylist = () => {
  playlist.innerHTML = "";
  if (!savedCombos.length) {
    playlist.innerHTML = '<li class="playlist__empty">No combos saved yet.</li>';
    return;
  }

  savedCombos.forEach((combo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${combo.sequence}</span>
      <span>${combo.meta}</span>
      <button aria-label="Remove combo" data-index="${index}">×</button>
    `;
    playlist.appendChild(li);
  });
};

const flashToast = (message) => {
  toast.textContent = message;
  toast.classList.add("toast--visible");
  setTimeout(() => toast.classList.remove("toast--visible"), 2200);
};

const synth = window.speechSynthesis;

speakButton.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    flashToast("Voice not supported here.");
    return;
  }

  const voiceLine = voices[Math.floor(Math.random() * voices.length)];
  const utterance = new SpeechSynthesisUtterance(
    `${comboSequence.textContent}. ${voiceLine}`
  );
  utterance.pitch = 1.1;
  utterance.rate = 0.95;
  utterance.volume = 0.9;
  synth.cancel();
  synth.speak(utterance);
});

const timerPhase = document.querySelector("#timer-phase");
const timerClock = document.querySelector("#timer-clock");
const timerProgress = document.querySelector("#timer-progress");
const timerRounds = document.querySelector("#timer-rounds");
const startTimerButton = document.querySelector("#start-timer");
const resetTimerButton = document.querySelector("#reset-timer");
const roundLengthInput = document.querySelector("#round-length");
const restLengthInput = document.querySelector("#rest-length");
const totalRoundsInput = document.querySelector("#total-rounds");
const intensityInput = document.querySelector("#intensity");

let timerInterval = null;
let currentPhase = "standby";
let currentRound = 0;
let remaining = 0;
let currentDuration = 0;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
};

const updateTimerUI = () => {
  timerClock.textContent = formatTime(remaining);
  timerRounds.textContent = `Round ${currentRound} / ${totalRoundsInput.value}`;
  const progress = Math.max(0, 1 - remaining / currentDuration);
  timerProgress.style.width = `${progress * 100}%`;

  const intensity = intensityInput.value;
  const gradientMap = {
    steady: "linear-gradient(90deg, #10b981, #14b8a6, #06b6d4)",
    surge: "linear-gradient(90deg, #f97316, #ef4444, #db2777)",
    endurance: "linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)",
  };
  timerProgress.style.background = gradientMap[intensity];
};

const setPhase = (phase) => {
  currentPhase = phase;
  timerPhase.textContent = phase.toUpperCase();
  timerPhase.style.color =
    phase === "rest" ? "#38bdf8" : phase === "fight" ? "#fbbf24" : "#94a3b8";
};

const startPhase = (phase) => {
  setPhase(phase);
  currentDuration =
    phase === "fight" ? Number(roundLengthInput.value) : Number(restLengthInput.value);
  remaining = currentDuration;
  updateTimerUI();
};

const stepTimer = () => {
  if (remaining > 0) {
    remaining -= 1;
    updateTimerUI();
    return;
  }

  if (currentPhase === "fight") {
    startPhase("rest");
  } else if (currentPhase === "rest") {
    currentRound += 1;
    if (currentRound > Number(totalRoundsInput.value)) {
      clearInterval(timerInterval);
      timerInterval = null;
      setPhase("complete");
      flashToast("Camp complete. Recover like a champ.");
      return;
    }
    startPhase("fight");
  }
};

startTimerButton.addEventListener("click", () => {
  if (timerInterval) {
    flashToast("Timer already running.");
    return;
  }

  currentRound = 1;
  startPhase("fight");
  timerInterval = setInterval(stepTimer, 1000);
  flashToast("Round timer engaged.");
});

resetTimerButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  currentPhase = "standby";
  currentRound = 0;
  remaining = Number(roundLengthInput.value);
  setPhase("standby");
  timerClock.textContent = formatTime(remaining);
  timerProgress.style.width = "0%";
  timerRounds.textContent = `Round 0 / ${totalRoundsInput.value}`;
});

const nav = document.querySelector(".nav");
const downloadButton = document.querySelector("#download-app");
const ctaGenerator = document.querySelector("#cta-generator");
const ctaTour = document.querySelector("#cta-tour");

ctaGenerator.addEventListener("click", () => {
  document.querySelector("#generator").scrollIntoView({ behavior: "smooth" });
});

ctaTour.addEventListener("click", () => {
  flashToast("Feature tour coming soon. Stay tuned.");
});

downloadButton.addEventListener("click", () => {
  flashToast("App build ready Q3. Tap to join beta.");
});

const heroCanvas = document.querySelector("#hero-globe");
const context = heroCanvas.getContext("2d");
const globeParticles = Array.from({ length: 120 }).map(() => ({
  angle: Math.random() * Math.PI * 2,
  radius: 0.35 + Math.random() * 0.25,
  speed: 0.002 + Math.random() * 0.004,
}));

const renderGlobe = () => {
  const { width, height } = heroCanvas;
  context.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) / 2.6;

  context.beginPath();
  const gradient = context.createRadialGradient(
    centerX,
    centerY,
    baseRadius * 0.2,
    centerX,
    centerY,
    baseRadius
  );
  gradient.addColorStop(0, "rgba(56, 189, 248, 0.45)");
  gradient.addColorStop(1, "rgba(14, 116, 144, 0.1)");
  context.fillStyle = gradient;
  context.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
  context.fill();

  globeParticles.forEach((particle) => {
    particle.angle += particle.speed;
    const x = centerX + Math.cos(particle.angle) * baseRadius * particle.radius;
    const y = centerY + Math.sin(particle.angle) * baseRadius * particle.radius;

    context.beginPath();
    context.fillStyle = "rgba(0, 242, 255, 0.75)";
    context.arc(x, y, 2, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(renderGlobe);
};

const resizeCanvas = () => {
  const size = Math.min(heroCanvas.parentElement.offsetWidth, 340);
  heroCanvas.width = size;
  heroCanvas.height = size;
};

window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();
renderGlobe();

triggerComboGeneration();
renderPlaylist();
remaining = Number(roundLengthInput.value);
updateTimerUI();
