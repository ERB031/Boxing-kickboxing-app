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
    {
      id: 'double-jab-cross-pivot',
      name: 'Double Jab → Cross → Pivot Step',
      sequence: ['Double Jab', 'Cross', 'Pivot Step'],
      category: 'Footwork',
      description: 'Float like Ali—sting, finish, and angle off the line.',
    },
    {
      id: 'peekaboo-slip-shovel-hook-cross',
      name: 'Slip → Lead Shovel Hook → Cross → Lead Hook',
      sequence: ['Slip Roll', 'Lead Shovel Hook', 'Cross', 'Lead Hook'],
      category: 'Peekaboo',
      description: 'Tyson-style slip inside then rip head and body.',
    },
    {
      id: 'peekaboo-duck-uppercut-hook-body',
      name: 'Slip → Rear Uppercut → Lead Hook → Lead Body Hook',
      sequence: ['Slip Roll', 'Rear Uppercut', 'Lead Hook', 'Lead Body Hook'],
      category: 'Power',
      description: 'Change levels and explode through the guard.',
    },
    {
      id: 'buakaw-teep-lowkick-switchknee',
      name: 'Lead Teep → Outside Low Kick → Switch Knee',
      sequence: ['Lead Teep', 'Outside Low Kick', 'Switch Knee'],
      category: 'Muay Thai Power',
      description: 'Buakaw rhythm—teep, chop the leg, then spear the knee.',
    },
    {
      id: 'buakaw-clinch-elbow-knee',
      name: 'Buakaw Clinch Smash',
      sequence: ['Clinch Entry', 'Horizontal Elbow', 'Rear Knee', 'Clinch Break'],
      category: 'Clinch',
      description: 'Secure the tie and finish with punishing knees and elbows.',
    },
    {
      id: 'saenchai-teep-sweep-question',
      name: 'Lead Teep → Foot Sweep → Question Mark Kick',
      sequence: ['Lead Teep', 'Foot Sweep', 'Question Mark Kick'],
      category: 'Showmanship',
      description: 'Saenchai wizardry blending balance breaks with deception.',
    },
    {
      id: 'saenchai-step-elbow-spin',
      name: 'Pivot Step → Step-In Elbow → Spinning Elbow',
      sequence: ['Pivot Step', 'Step-In Elbow', 'Spinning Elbow'],
      category: 'Creativity',
      description: 'Angle off then slice through with flowing elbows.',
    },
    {
      id: 'lomachenko-double-jab-angle-cross',
      name: 'Double Jab → Pivot Step → Cross → Lead Hook',
      sequence: ['Double Jab', 'Pivot Step', 'Cross', 'Lead Hook'],
      category: 'Angles',
      description: 'Southpaw Loma step to the outside before finishing.',
    },
    {
      id: 'lomachenko-roll-body-head',
      name: 'Jab → Slip Roll → Rear Uppercut → Pivot Step → Lead Hook',
      sequence: ['Jab', 'Slip Roll', 'Rear Uppercut', 'Pivot Step', 'Lead Hook'],
      category: 'Rhythm',
      description: 'Layer level changes with constant exits off the center.',
    },
    {
      id: 'joanna-volume-flow',
      name: 'Jab → Cross → Lead Hook → Rear Teep → Switch Kick',
      sequence: ['Jab', 'Cross', 'Lead Hook', 'Rear Teep', 'Switch Kick'],
      category: 'Volume',
      description: 'Jedrzejczyk pace—mix relentless hands with kicking flow.',
    },
    {
      id: 'joanna-clinch-barrage',
      name: 'Joanna Clinch Barrage',
      sequence: ['Clinch Entry', 'Horizontal Elbow', 'Rear Knee', 'Clinch Break'],
      category: 'Clinch Volume',
      description: 'Chain short elbows and knees before resetting distance.',
    },
    {
      id: 'ploy-angle-kick-finish',
      name: 'Southpaw Jab → Cross → Pivot Step → Left Body Kick',
      sequence: ['Southpaw Jab', 'Cross', 'Pivot Step', 'Left Body Kick'],
      category: 'Southpaw Control',
      description: 'Steal the outside line then whip the left kick through the ribs.',
    },
    {
      id: 'ploy-frame-elbow',
      name: 'Lead Teep → Long Guard → Horizontal Elbow',
      sequence: ['Lead Teep', 'Long Guard', 'Horizontal Elbow'],
      category: 'Frame & Fire',
      description: 'Freeze the guard with a frame before stepping through with the elbow.',
    },
    {
      id: 'ploy-clinch-knee',
      name: 'Southpaw Jab → Rear Hook → Clinch Entry → Rear Knee',
      sequence: ['Southpaw Jab', 'Rear Hook', 'Clinch Entry', 'Rear Knee'],
      category: 'Clinch Punish',
      description: 'Box your way in then feed a knee straight up the middle.',
    },
    {
      id: 'marcus-breath-flow',
      name: 'Lead Teep → Rear Teep → Breath Reset',
      sequence: ['Lead Teep', 'Rear Teep', 'Breath Reset'],
      category: 'Breathwork Flow',
      description: 'Control tempo with alternating teeps before settling into your breath.',
    },
    {
      id: 'marcus-shield-return',
      name: 'Long Guard → Breath Reset → Cross',
      sequence: ['Long Guard', 'Breath Reset', 'Cross'],
      category: 'Shield & Return',
      description: 'Frame the guard, re-center, then snap a sharp cross down the pipe.',
    },
    {
      id: 'marcus-slow-burn',
      name: 'Tempo Step → Jab → Cross → Breath Reset',
      sequence: ['Tempo Step', 'Jab', 'Cross', 'Breath Reset'],
      category: 'Pace Control',
      description: 'Step with intention, strike, then extend the exhale to stay composed.',
    },
    {
      id: 'liv-power-ladder',
      name: 'Rear Uppercut → Lead Hook → Rear Knee → Switch Kick',
      sequence: ['Rear Uppercut', 'Lead Hook', 'Rear Knee', 'Switch Kick'],
      category: 'Power Ladder',
      description: 'Climb from hands to knees to kicks without losing power output.',
    },
    {
      id: 'liv-low-high-finish',
      name: 'Outside Low Kick → Cross → Head Kick',
      sequence: ['Outside Low Kick', 'Cross', 'Head Kick'],
      category: 'Low-High Finish',
      description: 'Chop the base, punch the guard, then take the head off the centerline.',
    },
    {
      id: 'liv-clinch-drive',
      name: 'Clinch Entry → Rear Knee → Horizontal Elbow → Clinch Break',
      sequence: ['Clinch Entry', 'Rear Knee', 'Horizontal Elbow', 'Clinch Break'],
      category: 'Clinch Power',
      description: 'Secure posture, drive knees, and exit with a slicing elbow.',
    },
  ];

  const techniqueLibraryData = [
    { id: 'jab', name: 'Jab', category: 'Hands', description: 'Sharp lead straight with snap.' },
    { id: 'cross', name: 'Cross', category: 'Hands', description: 'Rear straight with full rotation.' },
    { id: 'lead-hook', name: 'Lead Hook', category: 'Hands', description: 'Tight hook, elbow level with fist.' },
    { id: 'rear-hook', name: 'Rear Hook', category: 'Hands', description: 'Power hook from the back side.' },
    { id: 'lead-uppercut', name: 'Lead Uppercut', category: 'Hands', description: 'Rise up the centerline.' },
    { id: 'rear-uppercut', name: 'Rear Uppercut', category: 'Hands', description: 'Explosive vertical shot.' },
    { id: 'southpaw-jab', name: 'Southpaw Jab', category: 'Hands', description: 'Right-hand lead flick from a southpaw stance.' },
    { id: 'lead-body-hook', name: 'Lead Body Hook', category: 'Body Shots', description: 'Dig to the liver with bend in the knees.' },
    { id: 'rear-body-hook', name: 'Rear Body Hook', category: 'Body Shots', description: 'Whip to the ribs off a pivot.' },
    { id: 'lead-teep', name: 'Lead Teep', category: 'Kicks', description: 'Long guard teep to manage range.' },
    { id: 'rear-teep', name: 'Rear Teep', category: 'Kicks', description: 'Power teep to the midsection.' },
    { id: 'switch-kick', name: 'Switch Kick', category: 'Kicks', description: 'Switch stance and whip high or mid.' },
    { id: 'outside-low-kick', name: 'Outside Low Kick', category: 'Kicks', description: 'Chop the calf with shin.' },
    { id: 'inside-low-kick', name: 'Inside Low Kick', category: 'Kicks', description: 'Lift the leg and slice the inner thigh.' },
    { id: 'head-kick', name: 'Head Kick', category: 'Kicks', description: 'High roundhouse to the temple.' },
    { id: 'question-mark-kick', name: 'Question Mark Kick', category: 'Kicks', description: 'Disguise low then whip high in one motion.' },
    { id: 'left-body-kick', name: 'Left Body Kick', category: 'Kicks', description: 'Southpaw rear kick wrapping into the ribs.' },
    { id: 'lead-knee', name: 'Lead Knee', category: 'Knees', description: 'Step up and spear through the core.' },
    { id: 'rear-knee', name: 'Rear Knee', category: 'Knees', description: 'Drive hips forward off the rear leg.' },
    { id: 'switch-knee', name: 'Switch Knee', category: 'Knees', description: 'Hop-switch and lance the knee straight through.' },
    { id: 'horizontal-elbow', name: 'Horizontal Elbow', category: 'Elbows', description: 'Slash across with forearm parallel to floor.' },
    { id: 'up-elbow', name: 'Up Elbow', category: 'Elbows', description: 'Rip vertically through the guard.' },
    { id: 'downward-elbow', name: 'Downward Elbow', category: 'Elbows', description: 'Drop the elbow over the brow.' },
    { id: 'spinning-elbow', name: 'Spinning Elbow', category: 'Elbows', description: 'Turn through and land the point of the elbow.' },
    { id: 'superman-punch', name: 'Superman Punch', category: 'Hands', description: 'Explosive airborne straight punch.' },
    { id: 'double-jab', name: 'Double Jab', category: 'Hands', description: 'Pop rapid 1-1s to disrupt rhythm and claim range.' },
    { id: 'lead-shovel-hook', name: 'Lead Shovel Hook', category: 'Body Shots', description: '45° lead hand rip that splits guard and digs the body.' },
    { id: 'pivot-step', name: 'Pivot Step', category: 'Footwork', description: 'Spin around the lead foot to create sharp angles.' },
    { id: 'tempo-step', name: 'Tempo Step', category: 'Footwork', description: 'Step in and out with measured cadence to manage pace.' },
    { id: 'foot-sweep', name: 'Foot Sweep', category: 'Footwork', description: 'Hook and guide their base leg off-line.' },
    { id: 'long-guard', name: 'Long Guard', category: 'Defense', description: 'Frame and shield to absorb strikes.' },
    { id: 'check-kick', name: 'Check Kick', category: 'Defense', description: 'Lift the shin to block low kicks.' },
    { id: 'slip-roll', name: 'Slip Roll', category: 'Defense', description: 'Slip inside and roll under the hook.' },
    { id: 'clinch-entry', name: 'Clinch Entry', category: 'Clinch', description: 'Secure inside position with posture.' },
    { id: 'clinch-break', name: 'Clinch Break', category: 'Clinch', description: 'Frame off and exit safely.' },
    { id: 'breath-reset', name: 'Breath Reset', category: 'Recovery', description: 'Slow nasal inhale with extended exhale to drop tension.' },
  ];

  const baseStyleLibraryData = [
    {
      id: 'muhammad-ali',
      name: 'Muhammad Ali',
      discipline: 'Heavyweight Boxing',
      focus: 'Footwork & Feints',
      headline: 'Float outside with fast doubles then pivot off.',
      summary:
        'Stay light on the feet, set rhythm with rapid jabs, and disappear off the line before a counter can chase you.',
      combos: ['double-jab-cross-pivot', 'jab-cross-roll-cross'],
      techniques: ['double-jab', 'pivot-step', 'long-guard'],
      coaching: [
        'Glide on the balls of your feet and keep the shoulders relaxed so the jab stays effortless.',
        'Snap the double jab to blind their vision before stinging with the cross.',
        'Pivot immediately after the finish so you are scoring while they swing at air.',
      ],
    },
    {
      id: 'mike-tyson',
      name: 'Mike Tyson',
      discipline: 'Peekaboo Boxing',
      focus: 'Slip & Rip Power',
      headline: 'Explode from a tight shell with ripping hooks.',
      summary:
        'Live in the pocket with head movement, sitting low in the legs so you can spring upward with crushing power.',
      combos: ['peekaboo-slip-shovel-hook-cross', 'peekaboo-duck-uppercut-hook-body'],
      techniques: ['lead-shovel-hook', 'lead-body-hook', 'slip-roll'],
      coaching: [
        'Slip before you punch so momentum is already loaded into the hips.',
        'Transfer weight hip-to-hip and keep elbows tight as you rip hooks upstairs and downstairs.',
        'Finish combinations with another slip or pivot to stay a step ahead of the return.',
      ],
    },
    {
      id: 'buakaw-banchamek',
      name: 'Buakaw Banchamek',
      discipline: 'Muay Thai Powerhouse',
      focus: 'Teep • Low Kick • Knees',
      headline: 'Own the center with teeps, chops, and punishing knees.',
      summary:
        'Control range with a stiff teep, batter their base with low kicks, then crash into the clinch to finish with knees.',
      combos: ['buakaw-teep-lowkick-switchknee', 'jab-cross-right-body-kick', 'buakaw-clinch-elbow-knee'],
      techniques: ['lead-teep', 'outside-low-kick', 'switch-knee', 'horizontal-elbow'],
      coaching: [
        'Post a long guard, stabbing the teep to send opponents backward before they can plant.',
        'Follow straight punches with low kicks to deaden the lead leg and slow their advance.',
        'Once they shell, lock the clinch, turn their posture, and drive the knee straight through the core.',
      ],
    },
    {
      id: 'saenchai',
      name: 'Saenchai',
      discipline: 'Muay Thai Showman',
      focus: 'Balance Traps & Creativity',
      headline: 'Play with rhythm using sweeps and spinning elbows.',
      summary:
        'Disrupt balance with playful teeps and sweeps, then dazzle with spins that arrive from impossible angles.',
      combos: ['saenchai-teep-sweep-question', 'saenchai-step-elbow-spin', 'lead-teep-cross-left-hook-low-kick'],
      techniques: ['foot-sweep', 'question-mark-kick', 'pivot-step', 'spinning-elbow'],
      coaching: [
        'Stay bouncing on the lead leg so you can hop into teeps or step-around sweeps at any moment.',
        'Sell the question mark kick with a low-line feint before whipping high to the temple.',
        'Use pivots into step-in elbows to keep opponents biting on every fainted direction change.',
      ],
    },
    {
      id: 'coach-ploy',
      name: 'Coach Ploy',
      discipline: 'Southpaw Savant',
      focus: 'Angles & Clinch Knees',
      headline: 'Control the pocket from the left side.',
      summary:
        'Layer southpaw jabs with pivots, frame off the guard, and crash into knees before opponents reclaim balance.',
      combos: ['ploy-angle-kick-finish', 'ploy-frame-elbow', 'ploy-clinch-knee'],
      techniques: ['southpaw-jab', 'pivot-step', 'left-body-kick', 'rear-knee'],
      coaching: [
        'Snap the southpaw jab to draw their guard high, then pivot before they can reset their feet.',
        'Frame with the long guard to freeze them before stepping through with slicing elbows.',
        'Finish exchanges by clinching up and feeding your rear knee through the center line.',
      ],
    },
    {
      id: 'coach-marcus',
      name: 'Coach Marcus',
      discipline: 'Performance Breathwork',
      focus: 'Tempo & Recovery',
      headline: 'Own the pace with intentional breathing.',
      summary:
        'Alternate sharp teeps with structured breathing resets so every combination ends with calm shoulders and clear focus.',
      combos: ['marcus-breath-flow', 'marcus-shield-return', 'marcus-slow-burn'],
      techniques: ['lead-teep', 'rear-teep', 'breath-reset', 'long-guard', 'tempo-step'],
      coaching: [
        'Keep inhales through the nose and extend the exhale through each strike to stay relaxed.',
        'After framing with the long guard, drop the shoulders before sending the cross back down the middle.',
        'Use the tempo step to reset stance and heart rate so every burst starts from balance.',
      ],
    },
    {
      id: 'coach-liv',
      name: 'Coach Liv',
      discipline: 'Hybrid Strength',
      focus: 'Power Output & Drive',
      headline: 'Build fight-ending power from the floor up.',
      summary:
        'Blend explosive uppercuts, low kicks, and knees to keep the engine revving while reinforcing strong positional frames.',
      combos: ['liv-power-ladder', 'liv-low-high-finish', 'liv-clinch-drive'],
      techniques: ['rear-uppercut', 'lead-hook', 'rear-knee', 'switch-kick', 'tempo-step'],
      coaching: [
        'Sit into your hips before the uppercut so the kinetic chain fires through every strike.',
        'Chop low then rip high without telegraphing—stay rooted through the floor.',
        'When you clinch, lock posture and drive the knee upward before ripping the elbow on exit.',
      ],
    },
    {
      id: 'vasiliy-lomachenko',
      name: 'Vasiliy Lomachenko',
      discipline: 'Matrix Boxing',
      focus: 'Angles & Volume',
      headline: 'Turn the corner after every touch.',
      summary:
        'Touch in bunches, exit off-center, and reappear on blind sides before the guard can reset.',
      combos: ['lomachenko-double-jab-angle-cross', 'lomachenko-roll-body-head', 'double-jab-cross-pivot'],
      techniques: ['double-jab', 'pivot-step', 'slip-roll', 'lead-hook'],
      coaching: [
        'Keep punches relaxed so you can immediately flow into the next angle change.',
        'Use the pivot step after the double jab to show up on their flank with a clean line.',
        'Blend head and body touches while your feet never stay planted in front.',
      ],
    },
    {
      id: 'joanna-jedrzejczyk',
      name: 'Joanna Jędrzejczyk',
      discipline: 'Striking Queen',
      focus: 'Relentless Pace & Clinch Strikes',
      headline: 'Drown opponents in layered volume.',
      summary:
        'Pepper with long combinations, finish with kicks, and punish inside the clinch before exiting clean.',
      combos: ['joanna-volume-flow', 'jab-cross-switch-kick', 'joanna-clinch-barrage'],
      techniques: ['rear-teep', 'switch-kick', 'horizontal-elbow', 'switch-knee'],
      coaching: [
        'Keep your stance active and elbows stacked so punches can chain without breaks.',
        'Seal combinations with a kick to create distance before the counter comes back.',
        'Frame the collar tie in the clinch and fire rapid knees before snapping out to range.',
      ],
    },
  ];

  const CUSTOM_STYLE_STORAGE_KEY = 'bagwork-buddy-custom-styles';
  const supportsStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  let customStyleLibraryData = supportsStorage ? loadCustomStyles() : [];
  let styleLibraryData = [...baseStyleLibraryData, ...customStyleLibraryData];

  const combinationMap = new Map(combinationLibraryData.map((combo) => [combo.id, combo]));
  const techniqueMap = new Map(techniqueLibraryData.map((tech) => [tech.id, tech]));

  const comboContainer = document.getElementById('comboLibrary');
  const techniqueContainer = document.getElementById('techniqueLibrary');
  const styleContainer = document.getElementById('styleLibrary');
  const styleSelect = document.getElementById('styleSelect');
  const clearStyleButton = document.getElementById('clearStyle');
  const advancedToggle = document.getElementById('advancedToggle');
  const advancedContent = document.getElementById('advancedContent');
  const styleInstructions = document.getElementById('styleInstructions');
  const defaultStyleInstructions = styleInstructions?.innerHTML ?? '';
  const customStyleToggle = document.getElementById('customStyleToggle');
  const customStyleForm = document.getElementById('customStyleForm');
  const customStyleMessage = document.getElementById('customStyleMessage');
  const customComboList = document.getElementById('customComboList');
  const customTechniqueList = document.getElementById('customTechniqueList');
  const customStyleUseSelection = document.getElementById('customStyleUseSelection');
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
  renderCustomBuilderList(combinationLibraryData, customComboList, 'combo');
  renderCustomBuilderList(techniqueLibraryData, customTechniqueList, 'technique');
  refreshStyleLibrary({ maintainSelection: false });
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
  styleSelect?.addEventListener('change', handleStyleSelectChange);
  clearStyleButton?.addEventListener('click', () => clearStyleState({ preserveSelections: false }));
  advancedToggle?.addEventListener('click', toggleAdvancedSettings);
  customStyleToggle?.addEventListener('click', toggleCustomStyleForm);
  customStyleForm?.addEventListener('submit', handleCustomStyleSubmit);
  customStyleUseSelection?.addEventListener('click', useCurrentSelectionsForCustomStyle);

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

  function renderStyleLibrary(data, activeId = '') {
    if (!styleContainer) return;
    styleContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((style) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'style-card';
      button.dataset.styleId = style.id;
      button.dataset.styleSource = style.isCustom ? 'custom' : 'preset';
      button.setAttribute('role', 'listitem');
      const isActive = activeId && style.id === activeId;
      button.setAttribute('aria-pressed', String(isActive));
      if (isActive) {
        button.classList.add('active');
      }

      const topRow = document.createElement('div');
      topRow.className = 'style-card-top';

      const name = document.createElement('span');
      name.className = 'style-name';
      name.textContent = style.name;
      topRow.appendChild(name);

      const tagCluster = document.createElement('div');
      tagCluster.className = 'style-card-tags';

      const focusPill = document.createElement('span');
      focusPill.className = 'style-pill';
      focusPill.textContent = style.focus ?? 'Signature Mix';
      tagCluster.appendChild(focusPill);

      if (style.isCustom) {
        const customBadge = document.createElement('span');
        customBadge.className = 'style-custom-badge';
        customBadge.textContent = 'Custom';
        tagCluster.appendChild(customBadge);
      }

      topRow.appendChild(tagCluster);

      button.appendChild(topRow);

      const discipline = document.createElement('span');
      discipline.className = 'style-meta';
      discipline.textContent = style.discipline;
      button.appendChild(discipline);

      const headline = document.createElement('p');
      headline.className = 'style-headline';
      headline.textContent = style.headline;
      button.appendChild(headline);

      button.addEventListener('click', () => applyStyle(style));

      fragment.appendChild(button);
    });
    styleContainer.appendChild(fragment);
  }

  function populateStyleSelect(data, activeId = '') {
    if (!styleSelect) return;
    const previous = activeId || styleSelect.value;
    styleSelect.querySelectorAll('option:not([value=""])').forEach((option) => option.remove());
    data.forEach((style) => {
      const option = document.createElement('option');
      option.value = style.id;
      const focusText = style.focus ? ` • ${style.focus}` : '';
      const customSuffix = style.isCustom ? ' (Custom)' : '';
      option.textContent = `${style.name}${focusText}${customSuffix}`;
      styleSelect.appendChild(option);
    });
    const hasPrevious = previous && data.some((style) => style.id === previous);
    styleSelect.value = hasPrevious ? previous : '';
  }

  function refreshStyleLibrary({ maintainSelection = true } = {}) {
    const activeId = maintainSelection ? styleSelect?.value ?? '' : '';
    styleLibraryData = [...baseStyleLibraryData, ...customStyleLibraryData];
    renderStyleLibrary(styleLibraryData, activeId);
    populateStyleSelect(styleLibraryData, activeId);
    if (maintainSelection && activeId && !styleLibraryData.some((style) => style.id === activeId)) {
      clearStyleState({ preserveSelections: true });
    }
  }

  function renderCustomBuilderList(data, container, type) {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const label = document.createElement('label');
      label.className = 'builder-item';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = item.id;
      input.name = type === 'combo' ? 'customCombos' : 'customTechniques';
      label.appendChild(input);

      const textWrapper = document.createElement('div');
      textWrapper.className = 'builder-item-body';

      const title = document.createElement('span');
      title.className = 'builder-title';
      title.textContent = item.name;
      textWrapper.appendChild(title);

      const meta = document.createElement('span');
      meta.className = 'builder-meta';
      meta.textContent = `${type === 'combo' ? 'Combo' : 'Technique'} • ${item.category}`;
      textWrapper.appendChild(meta);

      if (item.description) {
        const detail = document.createElement('span');
        detail.className = 'builder-description';
        detail.textContent = item.description;
        textWrapper.appendChild(detail);
      }

      label.appendChild(textWrapper);
      fragment.appendChild(label);
    });
    container.appendChild(fragment);
  }

  function toggleCustomStyleForm() {
    if (!customStyleToggle || !customStyleForm) return;
    const expanded = customStyleToggle.getAttribute('aria-expanded') === 'true';
    customStyleToggle.setAttribute('aria-expanded', String(!expanded));
    customStyleForm.hidden = expanded;
    if (!expanded) {
      showCustomStyleMessage('', false);
    }
  }

  function handleCustomStyleSubmit(event) {
    event.preventDefault();
    if (!customStyleForm) return;

    const formData = new FormData(customStyleForm);
    const name = String(formData.get('customStyleName') ?? '').trim();
    const discipline = String(formData.get('customStyleDiscipline') ?? '').trim();
    const focus = String(formData.get('customStyleFocus') ?? '').trim();
    const headline = String(formData.get('customStyleHeadline') ?? '').trim();
    const summary = String(formData.get('customStyleSummary') ?? '').trim();
    const coachingRaw = String(formData.get('customStyleCoaching') ?? '');
    const combos = getCheckedValues(customComboList);
    const techniques = getCheckedValues(customTechniqueList);

    if (!name) {
      showCustomStyleMessage('Give your style a name before saving.', true);
      return;
    }

    if (combos.length === 0 && techniques.length === 0) {
      showCustomStyleMessage('Select at least one combination or technique to store with the style.', true);
      return;
    }

    const coaching = coachingRaw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const newStyle = {
      id: createUniqueStyleId(name),
      name,
      discipline: discipline || 'Custom Blend',
      focus: focus || 'Personal Mix',
      headline: headline || 'Your personalized round blueprint.',
      summary:
        summary ||
        'Hand-picked moves saved from your builder so you can reload this flow in a single tap.',
      combos,
      techniques,
      coaching,
      isCustom: true,
    };

    customStyleLibraryData.push(newStyle);
    persistCustomStyles();
    refreshStyleLibrary({ maintainSelection: false });
    applyStyle(newStyle);
    resetCustomStyleForm();
    showCustomStyleMessage(`Saved ${name} to your signature library.`, false);
  }

  function useCurrentSelectionsForCustomStyle() {
    const comboSelections = getCurrentSelectionIds(comboContainer);
    const techniqueSelections = getCurrentSelectionIds(techniqueContainer);
    syncBuilderCheckboxes(customComboList, comboSelections);
    syncBuilderCheckboxes(customTechniqueList, techniqueSelections);
    showCustomStyleMessage(
      `Loaded ${comboSelections.length} combos and ${techniqueSelections.length} techniques from your current selection.`,
      false,
    );
  }

  function getCheckedValues(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
  }

  function getCurrentSelectionIds(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
  }

  function syncBuilderCheckboxes(container, ids) {
    if (!container) return;
    const idSet = new Set(ids);
    container.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = idSet.has(input.value);
    });
  }

  function resetCustomStyleForm() {
    customStyleForm?.reset();
    syncBuilderCheckboxes(customComboList, []);
    syncBuilderCheckboxes(customTechniqueList, []);
  }

  function showCustomStyleMessage(message, isError) {
    if (!customStyleMessage) return;
    customStyleMessage.textContent = message;
    customStyleMessage.classList.toggle('is-error', Boolean(isError));
  }

  function createUniqueStyleId(name) {
    const base = slugifyStyleName(name);
    let candidate = base;
    let counter = 2;
    while (styleLibraryData.some((style) => style.id === candidate)) {
      candidate = `${base}-${counter++}`;
    }
    return candidate;
  }

  function slugifyStyleName(value) {
    const base = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return base || `custom-style-${Date.now()}`;
  }

  function persistCustomStyles() {
    if (!supportsStorage) return;
    try {
      const payload = customStyleLibraryData.map(({ isCustom, ...style }) => style);
      window.localStorage.setItem(CUSTOM_STYLE_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('Unable to save custom styles', error);
    }
  }

  function loadCustomStyles() {
    if (!supportsStorage) return [];
    try {
      const raw = window.localStorage.getItem(CUSTOM_STYLE_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((entry) => entry && typeof entry.id === 'string')
        .map((entry) => ({ ...entry, isCustom: true }));
    } catch (error) {
      console.warn('Unable to load custom styles', error);
      return [];
    }
  }

  function applyStyle(style) {
    if (styleSelect) {
      styleSelect.value = style.id;
    }
    if (styleContainer) {
      styleContainer.querySelectorAll('.style-card').forEach((card) => {
        const isActive = card.dataset.styleId === style.id;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
      });
    }

    clearSelectionsForStyle();

    style.combos.forEach((comboId) => {
      const input = comboContainer?.querySelector(`input[value="${comboId}"]`);
      if (input) {
        input.checked = true;
      }
    });

    style.techniques.forEach((techId) => {
      const input = techniqueContainer?.querySelector(`input[value="${techId}"]`);
      if (input) {
        input.checked = true;
      }
    });

    updateSelectionSummary();
    updateStyleInstructions(style);
    callDisplay?.classList.remove('is-warning');
  }

  function updateStyleInstructions(style) {
    if (!styleInstructions) return;

    styleInstructions.innerHTML = '';

    const title = document.createElement('h4');
    title.textContent = `${style.name} Playbook`;
    styleInstructions.appendChild(title);

    const summary = document.createElement('p');
    summary.textContent = style.summary;
    styleInstructions.appendChild(summary);

    if (Array.isArray(style.coaching) && style.coaching.length > 0) {
      const cornerHeading = document.createElement('p');
      cornerHeading.className = 'style-subheading';
      cornerHeading.textContent = 'Corner notes';
      styleInstructions.appendChild(cornerHeading);

      const list = document.createElement('ul');
      list.className = 'style-coaching-list';
      style.coaching.forEach((cue) => {
        const li = document.createElement('li');
        li.textContent = cue;
        list.appendChild(li);
      });
      styleInstructions.appendChild(list);
    }

    const selectionGroups = document.createElement('div');
    selectionGroups.className = 'style-selection-groups';
    selectionGroups.appendChild(buildStyleChipGroup('Loaded combinations', style.combos, combinationMap));
    selectionGroups.appendChild(buildStyleChipGroup('Loaded techniques', style.techniques, techniqueMap));
    styleInstructions.appendChild(selectionGroups);

    const metaRow = document.createElement('div');
    metaRow.className = 'style-meta-row';
    const disciplineTag = document.createElement('span');
    disciplineTag.className = 'style-tag';
    disciplineTag.textContent = style.discipline;
    const focusTag = document.createElement('span');
    focusTag.className = 'style-tag';
    focusTag.textContent = style.focus;
    metaRow.append(disciplineTag, focusTag);
    styleInstructions.appendChild(metaRow);
  }

  function handleStyleSelectChange() {
    if (!styleSelect) return;
    const selectedId = styleSelect.value;
    if (!selectedId) {
      clearStyleState({ preserveSelections: true });
      return;
    }
    const style = findStyleById(selectedId);
    if (style) {
      applyStyle(style);
    }
  }

  function clearStyleState({ preserveSelections } = { preserveSelections: false }) {
    if (styleSelect) {
      styleSelect.value = '';
    }
    styleContainer?.querySelectorAll('.style-card').forEach((card) => {
      card.classList.remove('active');
      card.setAttribute('aria-pressed', 'false');
    });
    if (!preserveSelections) {
      clearSelectionsForStyle();
    }
    updateSelectionSummary();
    if (styleInstructions) {
      styleInstructions.innerHTML = defaultStyleInstructions;
    }
  }

  function findStyleById(id) {
    return styleLibraryData.find((entry) => entry.id === id);
  }

  function toggleAdvancedSettings() {
    if (!advancedToggle || !advancedContent) return;
    const expanded = advancedToggle.getAttribute('aria-expanded') === 'true';
    advancedToggle.setAttribute('aria-expanded', String(!expanded));
    advancedContent.hidden = expanded;
  }

  function buildStyleChipGroup(label, ids, sourceMap) {
    const wrapper = document.createElement('div');
    wrapper.className = 'style-chip-section';

    const heading = document.createElement('span');
    heading.className = 'style-selection-title';
    heading.textContent = label;
    wrapper.appendChild(heading);

    const chipRow = document.createElement('div');
    chipRow.className = 'style-chip-group';
    ids.forEach((id) => {
      const item = sourceMap.get(id);
      if (!item) return;
      const chip = document.createElement('span');
      chip.className = 'style-chip';
      chip.textContent = item.name;
      chipRow.appendChild(chip);
    });

    if (!chipRow.childNodes.length) {
      const empty = document.createElement('span');
      empty.className = 'style-chip empty';
      empty.textContent = 'None loaded';
      chipRow.appendChild(empty);
    }

    wrapper.appendChild(chipRow);
    return wrapper;
  }

  function clearSelectionsForStyle() {
    comboContainer?.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    techniqueContainer?.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
  }

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
    } else {
      styleContainer?.querySelectorAll('.style-card').forEach((card) => {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
      });
      if (styleSelect) {
        styleSelect.value = '';
      }
      if (styleInstructions) {
        styleInstructions.innerHTML = defaultStyleInstructions;
      }
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
