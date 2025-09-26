const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isExpanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', String(isExpanded));
    navToggle.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
    if (isExpanded) {
      document.addEventListener('click', closeOnOutsideClick);
    } else {
      document.removeEventListener('click', closeOnOutsideClick);
    }
  });
}

function closeOnOutsideClick(event) {
  if (!nav.contains(event.target)) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    document.removeEventListener('click', closeOnOutsideClick);
  }
}

if (navLinks) {
  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.setAttribute('aria-label', 'Open navigation');
    }
  });
}

if (navCta) {
  navCta.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
  });
}

// Schedule filtering
const filterButtons = document.querySelectorAll('.chip');
const scheduleCards = document.querySelectorAll('.schedule-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    filterButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');

    scheduleCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const shouldShow = category === 'all' || cardCategory === category;
      card.style.display = shouldShow ? 'flex' : 'none';
      card.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    });
  });
});

// Testimonials carousel
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentIndex = testimonials.findIndex((testimonial) => testimonial.classList.contains('active'));
let autoplayId = null;

function updateTestimonials(index) {
  testimonials.forEach((testimonial, idx) => {
    testimonial.classList.toggle('active', idx === index);
  });
  currentIndex = index;
}

function showNext() {
  const nextIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonials(nextIndex);
}

function showPrev() {
  const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonials(prevIndex);
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = window.setInterval(showNext, 7000);
}

function stopAutoplay() {
  if (autoplayId) {
    window.clearInterval(autoplayId);
  }
}

if (prevButton && nextButton && testimonials.length > 0) {
  prevButton.addEventListener('click', () => {
    showPrev();
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    showNext();
    startAutoplay();
  });

  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

const trainingLab = document.querySelector('.training-lab');

if (trainingLab) {
  const combinationLibraryData = [
    {
      id: 'jab-cross',
      name: 'Jab → Cross',
      sequence: ['Jab', 'Cross'],
      category: 'Hands',
      description: 'Fundamental 1-2 to set range and gauge distance.',
    },
    {
      id: 'jab-cross-hook-low-kick',
      name: 'Jab → Cross → Lead Hook → Outside Low Kick',
      sequence: ['Jab', 'Cross', 'Lead Hook', 'Outside Low Kick'],
      category: 'Hands + Kick',
      description: 'Rip to the head before chopping the calf.',
    },
    {
      id: 'jab-cross-right-body-kick',
      name: 'Jab → Cross → Right Body Kick',
      sequence: ['Jab', 'Cross', 'Right Body Kick'],
      category: 'Level Change',
      description: 'Pin the guard then wrap to the ribs.',
    },
    {
      id: 'jab-cross-right-knee',
      name: 'Jab → Cross → Rear Knee',
      sequence: ['Jab', 'Cross', 'Rear Knee'],
      category: 'Hands + Knee',
      description: 'Close distance and spear the midline.',
    },
    {
      id: 'jab-cross-left-hook-elbow',
      name: 'Jab → Cross → Lead Hook → Horizontal Elbow',
      sequence: ['Jab', 'Cross', 'Lead Hook', 'Horizontal Elbow'],
      category: 'Elbows',
      description: 'Box your way in and slice on the break.',
    },
    {
      id: 'jab-cross-roll-cross',
      name: 'Jab → Cross → Slip Roll → Cross',
      sequence: ['Jab', 'Cross', 'Slip Roll', 'Cross'],
      category: 'Defense',
      description: 'Add head movement before returning fire.',
    },
    {
      id: 'jab-cross-switch-kick',
      name: 'Jab → Cross → Switch Kick',
      sequence: ['Jab', 'Cross', 'Switch Kick'],
      category: 'Switch Kick',
      description: 'Hide the hip switch behind straight punches.',
    },
    {
      id: 'lead-teep-cross-left-hook-low-kick',
      name: 'Lead Teep → Cross → Lead Hook → Inside Low Kick',
      sequence: ['Lead Teep', 'Cross', 'Lead Hook', 'Inside Low Kick'],
      category: 'Teep Setups',
      description: 'Off-balance first, then attack high and low.',
    },
    {
      id: 'cross-hook-high-kick',
      name: 'Cross → Lead Hook → Head Kick',
      sequence: ['Cross', 'Lead Hook', 'Head Kick'],
      category: 'High Kick',
      description: 'Hide the high kick behind tight boxing.',
    },
    {
      id: 'jab-step-elbow-right-knee',
      name: 'Jab → Step-In Elbow → Rear Knee',
      sequence: ['Jab', 'Step-In Elbow', 'Rear Knee'],
      category: 'Clinch Entry',
      description: 'Crash the pocket with elbows before securing the knee.',
    },
    {
      id: 'jab-cross-lead-uppercut-cross-body-kick',
      name: 'Jab → Cross → Lead Uppercut → Cross → Body Kick',
      sequence: ['Jab', 'Cross', 'Lead Uppercut', 'Cross', 'Right Body Kick'],
      category: 'Power',
      description: 'Blend levels before finishing with power to the body.',
    },
    {
      id: 'cross-hook-elbow-knee',
      name: 'Cross → Lead Hook → Downward Elbow → Lead Knee',
      sequence: ['Cross', 'Lead Hook', 'Downward Elbow', 'Lead Knee'],
      category: 'Clinch Exit',
      description: 'Smash on entry and finish from the clinch.',
    },
    {
      id: 'jab-cross-inside-low-kick-cross',
      name: 'Jab → Cross → Inside Low Kick → Cross',
      sequence: ['Jab', 'Cross', 'Inside Low Kick', 'Cross'],
      category: 'Counters',
      description: 'Attack the inside leg and punish the reset.',
    },
    {
      id: 'jab-cross-spin-elbow',
      name: 'Jab → Cross → Spinning Elbow',
      sequence: ['Jab', 'Cross', 'Spinning Elbow'],
      category: 'Advanced',
      description: 'Set up flair offense after straight shots.',
    },
  ];

  const techniqueLibraryData = [
    { id: 'jab', name: 'Jab', category: 'Hands', description: 'Sharp lead straight with snap.' },
    { id: 'cross', name: 'Cross', category: 'Hands', description: 'Rear straight with full rotation.' },
    { id: 'lead-hook', name: 'Lead Hook', category: 'Hands', description: 'Tight hook, elbow level with fist.' },
    { id: 'rear-hook', name: 'Rear Hook', category: 'Hands', description: 'Power hook from the back side.' },
    { id: 'lead-uppercut', name: 'Lead Uppercut', category: 'Hands', description: 'Rise up the centerline.' },
    { id: 'rear-uppercut', name: 'Rear Uppercut', category: 'Hands', description: 'Explosive vertical shot.' },
    { id: 'lead-body-hook', name: 'Lead Body Hook', category: 'Body Shots', description: 'Dig to the liver with bend in the knees.' },
    { id: 'rear-body-hook', name: 'Rear Body Hook', category: 'Body Shots', description: 'Whip to the ribs off a pivot.' },
    { id: 'lead-teep', name: 'Lead Teep', category: 'Kicks', description: 'Long guard teep to manage range.' },
    { id: 'rear-teep', name: 'Rear Teep', category: 'Kicks', description: 'Power teep to the midsection.' },
    { id: 'switch-kick', name: 'Switch Kick', category: 'Kicks', description: 'Switch stance and whip high or mid.' },
    { id: 'outside-low-kick', name: 'Outside Low Kick', category: 'Kicks', description: 'Chop the calf with shin.' },
    { id: 'inside-low-kick', name: 'Inside Low Kick', category: 'Kicks', description: 'Lift the leg and slice the inner thigh.' },
    { id: 'head-kick', name: 'Head Kick', category: 'Kicks', description: 'High roundhouse to the temple.' },
    { id: 'lead-knee', name: 'Lead Knee', category: 'Knees', description: 'Step up and spear through the core.' },
    { id: 'rear-knee', name: 'Rear Knee', category: 'Knees', description: 'Drive hips forward off the rear leg.' },
    { id: 'horizontal-elbow', name: 'Horizontal Elbow', category: 'Elbows', description: 'Slash across with forearm parallel to floor.' },
    { id: 'up-elbow', name: 'Up Elbow', category: 'Elbows', description: 'Rip vertically through the guard.' },
    { id: 'downward-elbow', name: 'Downward Elbow', category: 'Elbows', description: 'Drop the elbow over the brow.' },
    { id: 'spinning-elbow', name: 'Spinning Elbow', category: 'Elbows', description: 'Turn through and land the point of the elbow.' },
    { id: 'superman-punch', name: 'Superman Punch', category: 'Hands', description: 'Explosive airborne straight punch.' },
    { id: 'long-guard', name: 'Long Guard', category: 'Defense', description: 'Frame and shield to absorb strikes.' },
    { id: 'check-kick', name: 'Check Kick', category: 'Defense', description: 'Lift the shin to block low kicks.' },
    { id: 'slip-roll', name: 'Slip Roll', category: 'Defense', description: 'Slip inside and roll under the hook.' },
    { id: 'clinch-entry', name: 'Clinch Entry', category: 'Clinch', description: 'Secure inside position with posture.' },
    { id: 'clinch-break', name: 'Clinch Break', category: 'Clinch', description: 'Frame off and exit safely.' },
  ];

  const combinationMap = new Map(combinationLibraryData.map((combo) => [combo.id, combo]));
  const techniqueMap = new Map(techniqueLibraryData.map((tech) => [tech.id, tech]));

  const comboContainer = document.getElementById('comboLibrary');
  const techniqueContainer = document.getElementById('techniqueLibrary');
  const comboCount = document.getElementById('comboCount');
  const techniqueCount = document.getElementById('techniqueCount');
  const startButton = document.getElementById('startRound');
  const pauseButton = document.getElementById('pauseRound');
  const resetButton = document.getElementById('resetRound');
  const nextButton = document.getElementById('nextCall');
  const clearHistoryButton = document.getElementById('clearHistory');
  const roundLengthSelect = document.getElementById('roundLength');
  const callRateInput = document.getElementById('callRate');
  const restLengthInput = document.getElementById('restLength');
  const allowRepeatsCheckbox = document.getElementById('allowRepeats');
  const callHistoryList = document.getElementById('callHistory');
  const timerDisplay = document.getElementById('timerDisplay');
  const phaseIndicator = document.getElementById('roundPhase');
  const callDisplay = document.querySelector('.call-display');
  const callSequence = document.getElementById('activeCall');
  const callTags = document.getElementById('activeTags');

  const state = {
    mode: 'idle',
    isPaused: false,
    roundDurationMs: 0,
    restDurationMs: 0,
    callIntervalMs: 0,
    remainingMs: 0,
    phaseEndsAt: 0,
    timerInterval: null,
    callInterval: null,
    pool: [],
    availablePool: [],
    allowRepeats: true,
  };

  let audioContext = null;

  renderLibraryList(combinationLibraryData, comboContainer, 'combo');
  renderLibraryList(techniqueLibraryData, techniqueContainer, 'technique');
  updateSelectionSummary();
  initializeTimerDisplay();

  comboContainer?.addEventListener('change', updateSelectionSummary);
  techniqueContainer?.addEventListener('change', updateSelectionSummary);

  document.querySelectorAll('.library-actions .link-button').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      const action = button.dataset.action;
      const container = target === 'combo' ? comboContainer : techniqueContainer;
      if (!container) return;
      container.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.checked = action === 'select-all';
      });
      updateSelectionSummary();
    });
  });

  startButton?.addEventListener('click', startRound);
  pauseButton?.addEventListener('click', togglePause);
  resetButton?.addEventListener('click', resetRound);
  nextButton?.addEventListener('click', handleNextCall);
  clearHistoryButton?.addEventListener('click', clearHistory);

  roundLengthSelect?.addEventListener('change', () => {
    const minutes = clampToRange(roundLengthSelect.value, 1, 5);
    roundLengthSelect.value = String(minutes);
    if (state.mode === 'idle') {
      state.remainingMs = minutes * 60000;
      updateTimerDisplay();
    }
  });

  callRateInput?.addEventListener('change', () => {
    const calls = clampToRange(callRateInput.value, 4, 30);
    callRateInput.value = String(calls);
  });

  restLengthInput?.addEventListener('change', () => {
    const restSeconds = clampToRange(restLengthInput.value, 0, 180);
    restLengthInput.value = String(restSeconds);
  });

  function renderLibraryList(data, container, type) {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const label = document.createElement('label');
      label.className = 'library-item';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = item.id;
      input.dataset.type = type;
      label.appendChild(input);

      const content = document.createElement('div');
      content.className = 'item-content';

      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = item.name;
      content.appendChild(title);

      const meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = `${type === 'combo' ? 'Combo' : 'Technique'} • ${item.category}`;
      content.appendChild(meta);

      if (item.description) {
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = item.description;
        content.appendChild(description);
      }

      label.appendChild(content);
      fragment.appendChild(label);
    });
    container.appendChild(fragment);
  }

  function startRound() {
    const pool = buildSelectionPool();
    if (pool.length === 0) {
      showWarning('Select at least one combination or technique to begin.');
      return;
    }

    const roundMinutes = clampToRange(roundLengthSelect?.value ?? '3', 1, 5);
    roundLengthSelect.value = String(roundMinutes);
    const callRate = clampToRange(callRateInput?.value ?? '10', 4, 30);
    callRateInput.value = String(callRate);
    const restSeconds = clampToRange(restLengthInput?.value ?? '45', 0, 180);
    restLengthInput.value = String(restSeconds);

    state.allowRepeats = Boolean(allowRepeatsCheckbox?.checked);
    state.pool = pool;
    state.availablePool = [...pool];
    state.roundDurationMs = roundMinutes * 60000;
    state.restDurationMs = restSeconds * 1000;
    state.callIntervalMs = Math.max(1500, Math.round(60000 / callRate));
    state.mode = 'round';
    state.isPaused = false;
    state.remainingMs = state.roundDurationMs;
    state.phaseEndsAt = Date.now() + state.roundDurationMs;

    clearHistory();
    stopIntervals();
    pauseButton.textContent = 'Pause';
    phaseIndicator.textContent = 'Round';
    setActiveCallMessage('Round armed. First cue coming up...', '');
    callDisplay?.classList.remove('is-warning');

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    nextButton.disabled = false;

    updateTimerDisplay();
    state.timerInterval = window.setInterval(tick, 100);
    tick();
    deliverCall(true);
    state.callInterval = window.setInterval(() => {
      deliverCall();
    }, state.callIntervalMs);
    playStartCue();
  }

  function togglePause() {
    if (state.mode !== 'round' && state.mode !== 'rest') {
      return;
    }

    if (!state.isPaused) {
      state.isPaused = true;
      pauseButton.textContent = 'Resume';
      state.remainingMs = Math.max(0, state.phaseEndsAt - Date.now());
      if (state.timerInterval) {
        window.clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
      if (state.mode === 'round' && state.callInterval) {
        window.clearInterval(state.callInterval);
        state.callInterval = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      state.isPaused = false;
      pauseButton.textContent = 'Pause';
      state.phaseEndsAt = Date.now() + state.remainingMs;
      state.timerInterval = window.setInterval(tick, 100);
      tick();
      if (state.mode === 'round') {
        deliverCall(true);
        state.callInterval = window.setInterval(() => {
          deliverCall();
        }, state.callIntervalMs);
      }
    }
  }

  function handleNextCall() {
    if (state.mode !== 'round' || state.pool.length === 0) {
      return;
    }

    const wasPaused = state.isPaused;
    deliverCall(true);
    if (!wasPaused) {
      if (state.callInterval) {
        window.clearInterval(state.callInterval);
      }
      state.callInterval = window.setInterval(() => {
        deliverCall();
      }, state.callIntervalMs);
    }
  }

  function resetRound() {
    stopIntervals();
    state.mode = 'idle';
    state.isPaused = false;
    state.pool = [];
    state.availablePool = [];
    state.remainingMs = clampToRange(roundLengthSelect?.value ?? '3', 1, 5) * 60000;
    phaseIndicator.textContent = 'Ready';
    setActiveCallMessage('Select combinations or techniques and press start.', '');
    callDisplay?.classList.remove('is-warning');
    updateTimerDisplay();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    resetButton.disabled = true;
    nextButton.disabled = true;

    clearHistory();
  }

  function buildSelectionPool() {
    const pool = [];
    comboContainer?.querySelectorAll('input[type="checkbox"]:checked').forEach((input) => {
      const combo = combinationMap.get(input.value);
      if (!combo) return;
      pool.push(toCallEntry(combo, 'combo'));
    });

    techniqueContainer?.querySelectorAll('input[type="checkbox"]:checked').forEach((input) => {
      const technique = techniqueMap.get(input.value);
      if (!technique) return;
      pool.push(toCallEntry(technique, 'technique'));
    });

    return pool;
  }

  function toCallEntry(item, type) {
    const sequence = 'sequence' in item && Array.isArray(item.sequence) ? item.sequence : [item.name];
    const label = sequence.join(' → ');
    const speakText = sequence.join(', ');
    return {
      id: item.id,
      label,
      sequence,
      meta: `${type === 'combo' ? 'Combo' : 'Technique'} • ${item.category}`,
      speakText,
      type,
    };
  }

  function deliverCall(force = false) {
    if (state.mode !== 'round' || state.pool.length === 0) {
      return;
    }

    if (state.isPaused && !force) {
      return;
    }

    const entry = pickNextEntry();
    if (!entry) {
      return;
    }

    setActiveCallMessage(entry.label, entry.meta);
    addToHistory(entry);
    speakCall(entry);
  }

  function pickNextEntry() {
    if (state.pool.length === 0) {
      return null;
    }

    if (state.allowRepeats) {
      const index = Math.floor(Math.random() * state.pool.length);
      return state.pool[index];
    }

    if (state.availablePool.length === 0) {
      state.availablePool = [...state.pool];
    }

    const index = Math.floor(Math.random() * state.availablePool.length);
    const [entry] = state.availablePool.splice(index, 1);
    return entry ?? null;
  }

  function tick() {
    state.remainingMs = Math.max(0, state.phaseEndsAt - Date.now());
    updateTimerDisplay();
    if (state.remainingMs <= 0) {
      if (state.timerInterval) {
        window.clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
      onPhaseComplete();
    }
  }

  function onPhaseComplete() {
    if (state.mode === 'round') {
      if (state.callInterval) {
        window.clearInterval(state.callInterval);
        state.callInterval = null;
      }
      playEndCue();
      if (state.restDurationMs > 0) {
        startRestPhase();
      } else {
        completeSession();
      }
    } else if (state.mode === 'rest') {
      playStartCue();
      completeSession();
    }
  }

  function startRestPhase() {
    state.mode = 'rest';
    state.isPaused = false;
    pauseButton.disabled = false;
    pauseButton.textContent = 'Pause';
    nextButton.disabled = true;
    phaseIndicator.textContent = 'Rest';
    state.remainingMs = state.restDurationMs;
    state.phaseEndsAt = Date.now() + state.restDurationMs;
    setActiveCallMessage('Recover, breathe, and get ready for the next bell.', 'Rest interval');
    callDisplay?.classList.remove('is-warning');
    state.timerInterval = window.setInterval(tick, 100);
    tick();
  }

  function completeSession() {
    stopIntervals();
    state.mode = 'complete';
    state.isPaused = false;
    state.remainingMs = 0;
    updateTimerDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    nextButton.disabled = true;
    resetButton.disabled = false;
    setActiveCallMessage('Round complete. Adjust your selections and tap start when ready.', '');
    callDisplay?.classList.remove('is-warning');
  }

  function stopIntervals() {
    if (state.timerInterval) {
      window.clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    if (state.callInterval) {
      window.clearInterval(state.callInterval);
      state.callInterval = null;
    }
  }

  function addToHistory(entry) {
    if (!callHistoryList) {
      return;
    }

    const item = document.createElement('li');
    item.className = 'history-item';

    const head = document.createElement('div');
    head.className = 'call-head';

    const name = document.createElement('span');
    name.className = 'call-name';
    name.textContent = entry.label;
    head.appendChild(name);

    const stamp = document.createElement('span');
    stamp.className = 'call-stamp';
    const elapsed = Math.max(0, state.roundDurationMs - state.remainingMs);
    stamp.textContent = formatStamp(elapsed);
    head.appendChild(stamp);

    const meta = document.createElement('div');
    meta.className = 'call-meta';
    meta.textContent = entry.meta;

    item.append(head, meta);
    callHistoryList.appendChild(item);

    if (callHistoryList.children.length > 40) {
      callHistoryList.removeChild(callHistoryList.firstElementChild);
    }

    callHistoryList.scrollTop = callHistoryList.scrollHeight;
  }

  function clearHistory() {
    if (callHistoryList) {
      callHistoryList.innerHTML = '';
      callHistoryList.scrollTop = 0;
    }
  }

  function updateSelectionSummary() {
    const comboSelected = comboContainer ? comboContainer.querySelectorAll('input[type="checkbox"]:checked').length : 0;
    const techniqueSelected = techniqueContainer ? techniqueContainer.querySelectorAll('input[type="checkbox"]:checked').length : 0;
    if (comboCount) {
      comboCount.textContent = String(comboSelected);
    }
    if (techniqueCount) {
      techniqueCount.textContent = String(techniqueSelected);
    }
    if ((comboSelected + techniqueSelected) > 0) {
      callDisplay?.classList.remove('is-warning');
    }
  }

  function updateTimerDisplay() {
    if (!timerDisplay) {
      return;
    }
    timerDisplay.textContent = formatClock(state.remainingMs);
  }

  function setActiveCallMessage(sequence, tags) {
    if (callSequence) {
      callSequence.textContent = sequence;
    }
    if (callTags) {
      callTags.textContent = tags;
    }
    callDisplay?.classList.remove('is-warning');
  }

  function showWarning(message) {
    setActiveCallMessage(message, '');
    callDisplay?.classList.add('is-warning');
  }

  function speakCall(entry) {
    if (!('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(entry.speakText);
      utterance.rate = 1.05;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      // No-op if speech synthesis is unavailable
    }
  }

  function clampToRange(value, min, max) {
    const numeric = Math.round(Number(value));
    if (Number.isNaN(numeric)) {
      return min;
    }
    return Math.min(max, Math.max(min, numeric));
  }

  function formatClock(ms) {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function formatStamp(ms) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function initializeTimerDisplay() {
    state.remainingMs = clampToRange(roundLengthSelect?.value ?? '3', 1, 5) * 60000;
    updateTimerDisplay();
  }

  function playStartCue() {
    playTone(880, 0.25);
    window.setTimeout(() => {
      playTone(1180, 0.2);
    }, 140);
  }

  function playEndCue() {
    playTone(540, 0.3);
    window.setTimeout(() => {
      playTone(420, 0.35);
    }, 160);
  }

  function playTone(frequency, duration = 0.3) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }
    if (!audioContext) {
      audioContext = new AudioContextCtor();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.06;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    const now = audioContext.currentTime;
    oscillator.start(now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.stop(now + duration + 0.05);
  }
}
