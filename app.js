// ── should scroll to top on load ──
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* @AUTHER       : AstroJr0 (github.com/AstroJr0)
  Date Created  : 09-12-2025
  Last Modified : 11-03-2026
*/

// ─────────────────────────────────────────────
//  CONFIGZ
// ─────────────────────────────────────────────
const ASSETS = {
  lofi: "assets/lofi1.mp3",
  jumpscare: "assets/jumpscare.png",
  jumpAudio: "assets/jumpscare.mp3",
};

// ─────────────────────────────────────────────
//  MUSIC DISCOVERIEZ & SWITCHERZ
// ─────────────────────────────────────────────
const musicSwitchBtn = document.getElementById("music-switch-btn");
const musicSwitchLabel = document.getElementById("music-switch-label");

let availableTracks = [ASSETS.lofi]; // Fallback to originalle
let currentTrackIdx = 0;

async function discoverMusic() {
  let tracks = [];
  for (let i = 1; i <= 30; i++) {
    try {
      let url = `assets/lofi${i}.mp3`;
      let res = await fetch(url, { method: "HEAD" });
      if (res.ok) {
        tracks.push(url);
      } else {
        break;
      }
    } catch (e) {
      break;
    }
  }

  if (tracks.length > 0) availableTracks = tracks;

  currentTrackIdx = Math.floor(Math.random() * availableTracks.length);
  lofiAudio.src = availableTracks[currentTrackIdx];
  updateMusicSwitchUI();
}

function updateMusicSwitchUI() {
  if (!musicSwitchLabel) return;
  const match = availableTracks[currentTrackIdx].match(/lofi(\d+)/);
  const num = match ? match[1] : currentTrackIdx + 1;
  musicSwitchLabel.textContent = `track: ${num}`;
}

if (musicSwitchBtn) {
  musicSwitchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (availableTracks.length <= 1) return;

    currentTrackIdx = (currentTrackIdx + 1) % availableTracks.length;
    lofiAudio.src = availableTracks[currentTrackIdx];
    updateMusicSwitchUI();

    if (musicStatus === "on") {
      lofiAudio.play().catch(() => {});
    }
  });
}

discoverMusic();

// ─────────────────────────────────────────────
//  DATAZZ
// ─────────────────────────────────────────────
const introSequence = [
  "Hey There!",
  "Welcome To My Universe",
  "Don't Worry, You Won't Be Bored, I Will Play Music For You.",
  "Let's Begin, It's Not A Portfolio, It's An Experience.",
  "An Experience, Out Of The World :)",
];

const projects = [
  {
    title: "matha-lib",
    kind: "Python package",
    description:
      "One package, many bad decisions (productive ones). matha-lib bundles math utilities, plotting helpers, sorting implementations, ML bits, probability distributions, plus calculus and algebra tools. Designed to be usable for real work and readable enough that future-me won't file a complaint.",
    tech: [
      "Python",
      "Math",
      "Plotting",
      "Sorting",
      "ML",
      "Calculus",
      "Algebra",
    ],
    link: "https://github.com/AstroJr0/matha-lib",
  },
  {
    title: "hyprcursor-sync-git",
    kind: "AUR project",
    description:
      'An AUR project for keeping cursor themes synced and sane—especially in Hyprland setups. Because nothing says "I have my life together" like version-controlling your cursor. Lightweight, practical, and built for people who rebuild their desktop at 2AM for spiritual reasons.',
    tech: ["AUR", "Linux", "Hyprland", "Git"],
    link: "https://github.com/AstroJr0/hyprcursor-sync-git",
  },
  {
    title: "Tauri Authenticator",
    kind: "Desktop app (Linux/Windows/macOS)",
    description:
      "A cross-platform authenticator built with Tauri: small footprint, fast startup, and a UI that doesn't look like a warning dialog from 2009. Daily-use smoothness—clean flows, low friction, desktop-native feel—so security doesn't have to be a punishment.",
    tech: ["Tauri", "JavaScript", "Desktop", "UI/UX"],
    link: "https://github.com/AstroJr0/uvz-auther",
  },
  {
    title: "Vocaloid",
    kind: "Vocaloid voicebank",
    description:
      "A Vocaloid voicebank I created using my own voice samples. It's like giving a microphone to your inner pop star and saying, \"Sing, but make it digital and slightly eerie.\" The result is a unique voice that can hit notes I can't even reach in real life—because who needs vocal range when you have code?",
    tech: [
      "Vocaloid",
      "Audio",
      "Voice Synthesis",
      "Python",
      "PyTorch",
      "(UNDER CONSTRUCTION)",
    ],
    link: "https://github.com/AstroJr0/vocaloid",
  },
];

const skillGroups = [
  { label: "Code", skills: ["JavaScript", "Python", "C++", "Tauri"] },
  { label: "Hardware", skills: ["ESP32"] },
  { label: "Web", skills: ["HTML", "CSS"] },
  { label: "Design", skills: ["UI/UX design", "Figma", "Inkscape", "Canva"] },
  { label: "My Laptop", skills: ["HP Elitebook 840 G2", "1366x768@60hz"] },
  {
    label: "Specz",
    skills: [
      "Intel i5 1st gen 5300U",
      "iGPU Intel 5500 HD",
      "Fan Works?: Probably...",
    ],
  },
];

// ─────────────────────────────────────────────
//  STATEZ
// ─────────────────────────────────────────────
let reducedMotion = false;
let musicAllowed = false;
let musicStatus = "off";
let introStep = 0;
let typingDone = false;
let typingInterval = null;
let brandClicks = 0;
let konamiIndex = 0;
let konamiActive = false;
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// ─────────────────────────────────────────────
//  DOM REFZ
// ─────────────────────────────────────────────
const mainEl = document.getElementById("main");
const lofiAudio = document.getElementById("lofi-audio");
const jumpscareAudio = document.getElementById("jumpscare-audio");
const jumpscareImg = document.getElementById("jumpscare-img");
const headphonesOvl = document.getElementById("headphones-overlay");
const introOvl = document.getElementById("intro-overlay");
const jumpscareOvl = document.getElementById("jumpscare-overlay");
const konamiOvl = document.getElementById("konami-overlay");
const musicBtn = document.getElementById("music-btn");
const musicLabel = document.getElementById("music-label");
const brandBtn = document.getElementById("brand-btn");
const introText = document.getElementById("intro-text");
const introCursor = document.getElementById("intro-cursor");
const introNextBtn = document.getElementById("intro-next-btn");
const introMusicBtn = document.getElementById("intro-music-btn");
const thanksToast = document.getElementById("thanks-toast");
const projectsGrid = document.getElementById("projects-grid");
const skillsGrid = document.getElementById("skills-grid");
const root = document.documentElement;

// ─────────────────────────────────────────────
//  NAV SCRAMBLEZZ
// ─────────────────────────────────────────────
const SCRAMBLE_CHARS = "✦⬡△◈⬢✸⊕∞⋆";
function scrambleText(el) {
  const original = el.dataset.original || el.textContent;
  el.dataset.original = original;
  let frame = 0;
  const total = 14;
  const id = setInterval(() => {
    el.textContent = original
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (frame / total > i / original.length) return char;
        return SCRAMBLE_CHARS[
          Math.floor(Math.random() * SCRAMBLE_CHARS.length)
        ];
      })
      .join("");
    if (++frame >= total) {
      clearInterval(id);
      el.textContent = original;
    }
  }, 28);
}

document.querySelectorAll(".navlink").forEach((el) => {
  el.addEventListener("mouseenter", () => scrambleText(el));
});

// ─────────────────────────────────────────────
//  ASSET INITZ
// ─────────────────────────────────────────────
lofiAudio.src = ASSETS.lofi;
jumpscareAudio.src = ASSETS.jumpAudio;
jumpscareImg.src = ASSETS.jumpscare;

// ─────────────────────────────────────────────
//  HELPERZ
// ─────────────────────────────────────────────
const show = (el) => el.classList.remove("hidden");
const hide = (el) => el.classList.add("hidden");

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
window.scrollToId = scrollToId;

// ─────────────────────────────────────────────
//  RENDER PROJECTZ
// ─────────────────────────────────────────────
projects.forEach((p, i) => {
  const article = document.createElement("article");
  article.className = "card project span-6";
  article.setAttribute("data-tilt", "");
  article.setAttribute("data-reveal", "pop");
  article.style.cssText = `--d:${180 + i * 90}ms`;
  const chips = p.tech
    .map(
      (t) =>
        `<span class="chip" data-reveal="fade" style="--d:${220 + i * 80}ms">${t}</span>`,
    )
    .join("");
  article.innerHTML = `
    <div class="project-head">
      <div><div class="kicker">${p.kind}</div><h3 class="h3"><span class="project-title">${p.title}</span></h3></div>
      <a class="btn" data-magnetic href="${p.link}" target="_blank" rel="noreferrer">peek →</a>
    </div>
    <p class="project-desc">${p.description}</p>
    <div class="chipset">${chips}</div>`;
  projectsGrid.appendChild(article);
});

// ─────────────────────────────────────────────
//  STAT COUNTERZZ
// ─────────────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  if (target === "∞" || target === "0") {
    if (target === "0") {
      let v = 99,
        id = setInterval(() => {
          el.textContent = v;
          v -= Math.ceil(v * 0.35);
          if (v <= 0) {
            clearInterval(id);
            el.textContent = "0";
          }
        }, 60);
    } else {
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease";
        el.style.opacity = "1";
      }, 100);
    }
    return;
  }
  const end = parseInt(target);
  if (isNaN(end)) return;
  const start = 0,
    step = 16;
  const steps = Math.floor(duration / step);
  let current = 0;
  const id = setInterval(() => {
    current++;
    el.textContent = Math.round(start + (end - start) * (current / steps));
    if (current >= steps) {
      clearInterval(id);
      el.textContent = target;
    }
  }, step);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target.querySelector(".stat-num");
      if (!numEl || numEl.dataset.counted) return;
      numEl.dataset.counted = "1";
      animateCounter(numEl, numEl.textContent.trim());
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat").forEach((el) => statObserver.observe(el));

// ─────────────────────────────────────────────
//  RENDER SKILLZ
// ─────────────────────────────────────────────
skillGroups.forEach((g, i) => {
  const div = document.createElement("div");
  div.className = "card";
  div.setAttribute("data-tilt", "");
  div.setAttribute("data-reveal", "pop");
  div.style.cssText = `--d:${140 + i * 90}ms`;
  const chips = g.skills
    .map(
      (s) =>
        `<span class="chip accent" data-reveal="fade" style="--d:${200 + i * 90}ms">${s}</span>`,
    )
    .join("");
  div.innerHTML = `<div class="kicker" data-reveal="fade" style="--d:${170 + i * 90}ms">${g.label}</div><div class="chipset">${chips}</div>`;
  skillsGrid.appendChild(div);
});

document.querySelectorAll(".project").forEach((card) => {
  const line = document.createElement("div");
  line.className = "scan-line";
  card.appendChild(line);
  card.addEventListener("mouseenter", () => {
    line.style.animation = "none";
    void line.offsetWidth;
    line.style.animation = "";
  });
});

// ─────────────────────────────────────────────
//  GLOW LETTER EFFECTZZ
// ─────────────────────────────────────────────
const glowEl = document.getElementById("glow-rehan");
if (glowEl) {
  const letters = glowEl.textContent.split("");
  glowEl.textContent = "";
  letters.forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "glow-letter";
    span.setAttribute("data-char", char);
    span.style.setProperty("--li", i);
    const ghost = document.createElement("span");
    ghost.className = "glow-ghost";
    ghost.textContent = char;
    ghost.setAttribute("aria-hidden", "true");
    span.textContent = char;
    span.appendChild(ghost);
    glowEl.appendChild(span);
  });
}

// ─────────────────────────────────────────────
//  STAR FIELD CANVAZZ
// ─────────────────────────────────────────────
const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");
let stars = [];
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

function initStars() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  stars = [];
  const count = Math.floor((window.innerWidth * window.innerHeight) / 2500); // Slightly more stars
  
  for (let i = 0; i < count; i++) {
    // Generate a size using an exponential-like distribution 
    // (Many small stars, fewer medium ones, very few large ones)
    const randomSeed = Math.random();
    let size;
    if (randomSeed > 0.98) size = Math.random() * 3.5 + 7; // Big stars
    else if (randomSeed > 0.85) size = Math.random() * 2.2 + 1; // Medium
    else size = Math.random() * 1 + 0.8; // Tiny

    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      z: Math.random() * 0.8 + 0.2,
      r: size,
      base: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.6 + 0.1,
      phase: Math.random() * Math.PI * 2,
      colorType: Math.random(),
      glow: randomSeed > 0.95 // Only big stars glow
    });
  }
}

let camX = 0, camY = 0, starT = 0;
function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starT += 0.012;
  camX += ((mouseX - window.innerWidth / 2) * 0.05 - camX) * 0.1;
  camY += ((mouseY - window.innerHeight / 2) * 0.05 - camY) * 0.1;

  for (const s of stars) {
    const alpha = s.base + Math.sin(starT * s.speed + s.phase) * 0.3;
    let px = (s.x + camX * s.z * 15 + starCanvas.width) % starCanvas.width;
    let py = (s.y + camY * s.z * 15 + starCanvas.height) % starCanvas.height;
    
    starCtx.beginPath();
    starCtx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
    
    if (s.glow) {
      starCtx.shadowBlur = 10;
      starCtx.shadowColor = "rgba(255, 255, 255, 0.5)";
    } else {
      starCtx.shadowBlur = 0;
    }

    starCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    starCtx.fill();
  }
  requestAnimationFrame(drawStars);
}

initStars(); drawStars();
// --- Sparkle Configuration ---
const sparkleConfig = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["34, 211, 238", "252, 254, 255", "139, 92, 246"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

let lastStarTimestamp = Date.now();
let lastStarPosition = { x: 0, y: 0 };
let lastMousePosition = { x: 0, y: 0 };
let sparkleCount = 0;

const createGlowPoint = (pos) => {
  const glow = document.createElement("div");
  glow.className = "glow-point";
  glow.style.left = pos.x + "px";
  glow.style.top = pos.y + "px";
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), sparkleConfig.glowDuration);
};

const createSparkle = (pos) => {
  const { createElement, Sparkle } = lucide;
  const star = createElement(Sparkle);
  const color =
    sparkleConfig.colors[
      Math.floor(Math.random() * sparkleConfig.colors.length)
    ];

  star.setAttribute("class", "star");
  star.style.left = pos.x + "px";
  star.style.top = pos.y + "px";
  star.style.fontSize =
    sparkleConfig.sizes[Math.floor(Math.random() * sparkleConfig.sizes.length)];
  star.style.color = `rgb(${color})`;
  star.style.filter = `drop-shadow(0px 0px 8px rgb(${color} / 0.8))`;
  star.style.animation = `${sparkleConfig.animations[sparkleCount++ % 3]} ${sparkleConfig.starAnimationDuration}ms forwards`;

  document.body.appendChild(star);
  setTimeout(() => star.remove(), sparkleConfig.starAnimationDuration);
};

// ─────────────────────────────────────────────
//  UNIFIED POINTER MOVE (Logic merged to avoid "sticking")
// ─────────────────────────────────────────────
const cursorOrb = document.getElementById("cursor-orb");

window.addEventListener(
  "pointermove",
  (e) => {
    const currentPos = { x: e.clientX, y: e.clientY };

    // 1. Update Global State
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 2. Custom Orb Position
    if (cursorOrb) {
      cursorOrb.style.left = mouseX + "px";
      cursorOrb.style.top = mouseY + "px";
      const isInteractive = e.target.closest("a,button,[data-magnetic]");
      cursorOrb.classList.toggle("cursor-hover", !!isInteractive);
    }

    // 3. STICKING FIX: If gap is huge (re-entry), teleport instead of trailing
    const dist = Math.hypot(
      currentPos.x - lastMousePosition.x,
      currentPos.y - lastMousePosition.y,
    );
    if (dist > 500) {
      lastMousePosition = currentPos;
      lastStarPosition = currentPos;
      return;
    }

    // 4. Handle Glow Trail
    const quantity = Math.max(
      Math.floor(dist / sparkleConfig.maximumGlowPointSpacing),
      1,
    );
    for (let i = 0; i < quantity; i++) {
      const x =
        lastMousePosition.x +
        (currentPos.x - lastMousePosition.x) * (i / quantity);
      const y =
        lastMousePosition.y +
        (currentPos.y - lastMousePosition.y) * (i / quantity);
      createGlowPoint({ x, y });
    }

    // 5. Handle Sparkle Spawning
    const timeSinceLast = Date.now() - lastStarTimestamp;
    const distSinceLast = Math.hypot(
      currentPos.x - lastStarPosition.x,
      currentPos.y - lastStarPosition.y,
    );

    if (
      distSinceLast >= sparkleConfig.minimumDistanceBetweenStars ||
      timeSinceLast > sparkleConfig.minimumTimeBetweenStars
    ) {
      createSparkle(currentPos);
      lastStarTimestamp = Date.now();
      lastStarPosition = currentPos;
    }

    lastMousePosition = currentPos;
  },
  { passive: true },
);

// Prevent sticking on leave
document.addEventListener("mouseleave", () => {
  lastMousePosition = { x: 0, y: 0 };
  lastStarPosition = { x: 0, y: 0 };
});

function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starT += 0.012;

  const targetX = (mouseX > 0 ? mouseX - window.innerWidth / 2 : 0) * 0.05;
  const targetY = (mouseY > 0 ? mouseY - window.innerHeight / 2 : 0) * 0.05;
  camX += (targetX - camX) * 0.1;
  camY += (targetY - camY) * 0.1;

  for (const s of stars) {
    const alpha = s.base + Math.sin(starT * s.speed + s.phase) * 0.3;
    let px = s.x + camX * s.z * 15;
    let py = s.y + camY * s.z * 15;

    px = ((px % starCanvas.width) + starCanvas.width) % starCanvas.width;
    py = ((py % starCanvas.height) + starCanvas.height) % starCanvas.height;

    let rgb = "255,255,255";
    if (s.colorType < 0.1) rgb = "134,213,255";
    else if (s.colorType < 0.18) rgb = "255,134,134";

    starCtx.beginPath();
    starCtx.arc(px, py, s.r * s.z, 0, Math.PI * 2);

    if (s.glow) {
      starCtx.shadowBlur = 12 * s.z;
      starCtx.shadowColor = `rgba(${rgb}, ${alpha})`;
    } else {
      starCtx.shadowBlur = 0;
    }

    starCtx.fillStyle = `rgba(${rgb}, ${alpha})`;
    starCtx.fill();
  }

  starCtx.shadowBlur = 0;
  requestAnimationFrame(drawStars);
}

initStars();
drawStars();
window.addEventListener("resize", initStars, { passive: true });

// ─────────────────────────────────────────────
//  DOT SUPERNOVAZZZZZZZZZZZZ
// ─────────────────────────────────────────────
document.querySelector(".dot")?.addEventListener("click", (e) => {
  if (reducedMotion) return;
  const rect = e.target.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = [
    "rgba(139,92,246,0.7)",
    "rgba(34,211,238,0.6)",
    "rgba(232,121,249,0.5)",
    "rgba(251,191,36,0.4)",
  ];
  const sizes = [120, 220, 340, 480];
  sizes.forEach((size, i) => {
    const ring = document.createElement("div");
    ring.className = "supernova-ring";
    ring.style.cssText = `left:${cx}px; top:${cy}px; width:${size}px; height:${size}px; border: 1.5px solid ${colors[i]}; box-shadow: 0 0 ${12 + i * 6}px ${colors[i]}; animation-delay:${i * 80}ms; animation-duration:${0.7 + i * 0.15}s;`;
    document.body.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove(), { once: true });
  });
});

// ─────────────────────────────────────────────
//  CLICK STARBURST RIPPLEZZ
// ─────────────────────────────────────────────
document.addEventListener("click", (e) => {
  if (reducedMotion) return;
  for (let n = 0; n < 3; n++) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; animation-delay:${n * 80}ms; border-color: rgba(139,92,246,${0.6 - n * 0.15});`;
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });
  }
});

// ─────────────────────────────────────────────
//  IDLE COMETZ
// ─────────────────────────────────────────────
let idleTimer = null;
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(launchComet, 10000);
}

function launchComet() {
  if (reducedMotion) return;
  const comet = document.createElement("div");
  comet.className = "comet";
  
  // Random entry point and path
  const startY = 5 + Math.random() * 40;
  const endY = startY + (15 + Math.random() * 20); // Path descends
  
  // Calculate angle for tilt (tan inverse of vertical delta / horizontal delta)
  // Since comet moves 100vw horizontally, we use 100 as the base.
  const angle = Math.atan2(endY - startY, 100) * (180 / Math.PI);
  
  comet.style.setProperty("--startY", startY + "vh");
  comet.style.setProperty("--endY", endY + "vh");
  comet.style.setProperty("--tilt", (angle + 45) + "deg"); // +45 adjusts the CSS shape's base angle
  
  document.body.appendChild(comet);
  comet.addEventListener("animationend", () => {
    comet.remove();
    resetIdleTimer();
  }, { once: true });
}

window.addEventListener("pointermove", resetIdleTimer, { passive: true });
resetIdleTimer();
// ─────────────────────────────────────────────
//  MUSICZZZZZZ
// ─────────────────────────────────────────────
async function ensureAudio() {
  if (!musicAllowed) return;
  try {
    lofiAudio.volume = 0.3;
    await lofiAudio.play();
    musicStatus = "on";
    updateMusicBtn();
  } catch {}
}

function toggleMusic() {
  if (!musicAllowed) return;
  if (musicStatus === "muted" || lofiAudio.paused) {
    lofiAudio.play();
    musicStatus = "on";
  } else {
    lofiAudio.pause();
    musicStatus = "muted";
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  musicLabel.textContent = musicStatus === "on" ? "music: on" : "music: off";
  introMusicBtn.textContent = musicStatus === "on" ? "mute" : "unmute";
}

// ─────────────────────────────────────────────
//  HEADPHONES OVERLAYZZZ
// ─────────────────────────────────────────────
function continueFromHeadphones(allowMusic) {
  musicAllowed = allowMusic;
  hide(headphonesOvl);
  if (allowMusic) {
    show(musicBtn);
    show(introMusicBtn);
  }
  openIntro();
}
document
  .getElementById("hp-yes")
  .addEventListener("click", () => continueFromHeadphones(true));
document
  .getElementById("hp-no")
  .addEventListener("click", () => continueFromHeadphones(false));

// ─────────────────────────────────────────────
//  INTRO SEQUENCEZZZ
// ─────────────────────────────────────────────
function openIntro() {
  introStep = 0;
  show(introOvl);
  introOvl.focus();
  startTyping();
}

const glitchObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const h2 = entry.target;
      if (h2.dataset.glitched) return;
      h2.dataset.glitched = "1";
      setTimeout(() => {
        h2.classList.add("glitch-once");
        h2.addEventListener(
          "animationend",
          () => h2.classList.remove("glitch-once"),
          { once: true },
        );
      }, 300);
      glitchObserver.unobserve(h2);
    });
  },
  { threshold: 0.8 },
);

document
  .querySelectorAll("#projects .h2, #skills .h2, #hire .h2")
  .forEach((el) => glitchObserver.observe(el));

function startTyping() {
  clearInterval(typingInterval);
  typingDone = false;
  introText.textContent = "";
  introCursor.textContent = "▌";
  introNextBtn.textContent = "skip typing";
  const full = introSequence[introStep] ?? "";
  if (reducedMotion) {
    introText.textContent = full;
    typingDone = true;
    introCursor.textContent = "";
    introNextBtn.textContent =
      introStep === introSequence.length - 1 ? "enter" : "next";
    return;
  }
  let i = 0;
  typingInterval = setInterval(() => {
    i = Math.min(full.length, i + 1);
    introText.textContent = full.slice(0, i);
    if (i >= full.length) {
      clearInterval(typingInterval);
      typingDone = true;
      introCursor.textContent = "";
      introNextBtn.textContent =
        introStep === introSequence.length - 1 ? "enter" : "next";
    }
  }, 18);
}

function nextIntro() {
  if (!typingDone) {
    clearInterval(typingInterval);
    introText.textContent = introSequence[introStep] ?? "";
    typingDone = true;
    introCursor.textContent = "";
    introNextBtn.textContent =
      introStep === introSequence.length - 1 ? "enter" : "next";
    return;
  }
  if (introStep < introSequence.length - 1) {
    introStep++;
    if (introStep === 2) ensureAudio();
    startTyping();
    return;
  }
  introOvl.style.transition = "opacity 0.7s ease, backdrop-filter 0.7s ease";
  introOvl.style.opacity = "0";
  introOvl.style.backdropFilter = "blur(0px)";
  setTimeout(() => {
    hide(introOvl);
    introOvl.style.opacity = "";
    introOvl.style.transition = "";
    introOvl.style.backdropFilter = "";
    if (musicAllowed && musicStatus === "off") ensureAudio();
  }, 700);
}

introOvl.addEventListener("click", nextIntro);
introNextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nextIntro();
});
introMusicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMusic();
});
musicBtn.addEventListener("click", toggleMusic);

// ─────────────────────────────────────────────
//  HIRE BUTTONZZ
// ─────────────────────────────────────────────
document.getElementById("yes-btn").addEventListener("click", () => {
  show(thanksToast);
  setTimeout(() => hide(thanksToast), reducedMotion ? 900 : 1800);
});

document.getElementById("no-btn").addEventListener("click", () => {
  const el = document.documentElement;
  el.requestFullscreen?.() ||
    el.webkitRequestFullscreen?.() ||
    el.mozRequestFullScreen?.();
  show(jumpscareOvl);
  jumpscareAudio.currentTime = 0;
  const p = jumpscareAudio.play();
  if (p) p.catch(() => {});
  let dismissed = false;
  const dismissJumpscare = () => {
    if (dismissed) return;
    dismissed = true;
    hide(jumpscareOvl);
    jumpscareAudio.pause();
    jumpscareAudio.currentTime = 0;
    document.exitFullscreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.mozCancelFullScreen?.();
  };
  jumpscareAudio.addEventListener("ended", dismissJumpscare, { once: true });
  setTimeout(dismissJumpscare, reducedMotion ? 650 : 1300);
});

brandBtn.addEventListener("click", () => {
  brandClicks++;
  brandBtn.textContent =
    brandClicks >= 5 ? "Bro, Im still a student fr" : "Student Dev !";
});

// ─────────────────────────────────────────────
//  KONAMI CODE
// ─────────────────────────────────────────────
function triggerKonami() {
  show(konamiOvl);
  const canvas = document.getElementById("konami-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const shots = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    vx: (Math.random() - 0.3) * 6 + 4,
    vy: Math.random() * 3 + 1,
    len: Math.random() * 120 + 60,
    alpha: Math.random() * 0.6 + 0.4,
    hue: Math.random() < 0.5 ? 260 : 188,
  }));

  let frame = 0;
  function animateKonami() {
    ctx.fillStyle = "rgba(4,4,16,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const s of shots) {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x > canvas.width + 200 || s.y > canvas.height + 100) {
        s.x = Math.random() * canvas.width * 0.3;
        s.y = Math.random() * canvas.height * 0.3;
      }
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6));
      const grad = ctx.createLinearGradient(
        s.x - s.vx * (s.len / 6),
        s.y - s.vy * (s.len / 6),
        s.x,
        s.y,
      );
      grad.addColorStop(0, `hsla(${s.hue},80%,70%,0)`);
      grad.addColorStop(1, `hsla(${s.hue},80%,90%,${s.alpha})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    frame++;
    if (frame < 300 && !konamiOvl.classList.contains("hidden")) {
      requestAnimationFrame(animateKonami);
    }
  }
  animateKonami();
}

document
  .getElementById("konami-close")
  .addEventListener("click", () => hide(konamiOvl));

const konamiHint = document.getElementById("konami-hint");
if (konamiHint) {
  const pulse = () => {
    konamiHint.classList.remove("hint-pulse");
    void konamiHint.offsetWidth;
    konamiHint.classList.add("hint-pulse");
  };
  setTimeout(pulse, 3000);
  setInterval(pulse, 15000);
}

// ─────────────────────────────────────────────
//  KEYBOARDZ
// ─────────────────────────────────────────────
window.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Escape") {
      hide(jumpscareOvl);
      hide(introOvl);
      hide(headphonesOvl);
      hide(konamiOvl);
    }
    if (e.key === " " && !introOvl.classList.contains("hidden")) {
      e.preventDefault();
      nextIntro();
    }
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiActive = !konamiActive;
        konamiIndex = 0;
        if (konamiActive) triggerKonami();
        else hide(konamiOvl);
      }
    } else {
      konamiIndex = 0;
    }
  },
  { passive: false },
);

// ─────────────────────────────────────────────
//  SCROLL PROGREZZ
// ─────────────────────────────────────────────
let scrollRaf = 0;
function updateScrollProgress() {
  const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
  root.style.setProperty(
    "--scroll",
    String(Math.min(1, Math.max(0, window.scrollY / max))),
  );
}
window.addEventListener(
  "scroll",
  () => {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      updateScrollProgress();
    });
  },
  { passive: true },
);
updateScrollProgress();

// ─────────────────────────────────────────────
//  NEBULA POINTER GLOWZ
// ─────────────────────────────────────────────
let pointerRaf = 0;
window.addEventListener(
  "pointermove",
  (e) => {
    if (pointerRaf) return;
    pointerRaf = requestAnimationFrame(() => {
      pointerRaf = 0;
      root.style.setProperty(
        "--mx",
        `${Math.round((e.clientX / window.innerWidth) * 1000) / 10}%`,
      );
      root.style.setProperty(
        "--my",
        `${Math.round((e.clientY / window.innerHeight) * 1000) / 10}%`,
      );
    });
  },
  { passive: true },
);

// ─────────────────────────────────────────────
//  MAGNETIC & TILT EFFECTS
// ─────────────────────────────────────────────
function attachMagnetic(el, strength = 12) {
  let raf = 0,
    lx = 0,
    ly = 0;
  const update = () => {
    raf = 0;
    const r = el.getBoundingClientRect();
    const rx = (lx - r.left) / Math.max(1, r.width);
    const ry = (ly - r.top) / Math.max(1, r.height);
    el.style.setProperty("--mag-x", `${((rx - 0.5) * strength).toFixed(2)}px`);
    el.style.setProperty("--mag-y", `${((ry - 0.5) * strength).toFixed(2)}px`);
    el.style.setProperty("--rip-x", `${Math.round(rx * 100)}%`);
    el.style.setProperty("--rip-y", `${Math.round(ry * 100)}%`);
  };
  el.addEventListener(
    "pointermove",
    (e) => {
      lx = e.clientX;
      ly = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true },
  );
  el.addEventListener(
    "pointerleave",
    () => {
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    },
    { passive: true },
  );
}

function attachTilt(el, maxDeg = 8) {
  let raf = 0,
    lx = 0,
    ly = 0;
  const update = () => {
    raf = 0;
    const r = el.getBoundingClientRect();
    const dx = (lx - r.left) / Math.max(1, r.width) - 0.5;
    const dy = (ly - r.top) / Math.max(1, r.height) - 0.5;
    el.style.setProperty("--tilt-x", `${(-dy * maxDeg).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(dx * maxDeg).toFixed(2)}deg`);
  };
  el.addEventListener(
    "pointermove",
    (e) => {
      lx = e.clientX;
      ly = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true },
  );
  el.addEventListener(
    "pointerleave",
    () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    },
    { passive: true },
  );
}

// ─────────────────────────────────────────────
//  SCROLL REVEALZ + ENHANCEMENT SYSTEMZ
// ─────────────────────────────────────────────
const enhancedMagnetic = new WeakSet();
const enhancedTilt = new WeakSet();
const enhancedReveal = new WeakSet();

const revealObserver = reducedMotion
  ? null
  : new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

function enhanceElement(el) {
  if (!(el instanceof HTMLElement)) return;
  if (
    !reducedMotion &&
    el.hasAttribute("data-magnetic") &&
    !enhancedMagnetic.has(el)
  ) {
    enhancedMagnetic.add(el);
    attachMagnetic(el);
  }
  if (!reducedMotion && el.hasAttribute("data-tilt") && !enhancedTilt.has(el)) {
    enhancedTilt.add(el);
    attachTilt(el);
  }
  if (el.hasAttribute("data-reveal") && !enhancedReveal.has(el)) {
    enhancedReveal.add(el);
    if (reducedMotion) el.classList.add("is-in");
    else revealObserver?.observe(el);
  }
}

function enhanceTree(rootEl) {
  if (!(rootEl instanceof Element)) return;
  if (rootEl instanceof HTMLElement) enhanceElement(rootEl);
  rootEl
    .querySelectorAll("[data-magnetic],[data-tilt],[data-reveal]")
    .forEach(enhanceElement);
}

enhanceTree(document.body);
new MutationObserver((mutations) => {
  for (const m of mutations) for (const node of m.addedNodes) enhanceTree(node);
}).observe(document.body, { childList: true, subtree: true });

const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
reducedMotion = mql.matches;
mql.addEventListener("change", () => {
  reducedMotion = mql.matches;
});

// ──────────────────────────────────────────────
//  TERMINAL
// ──────────────────────────────────────────────
(function () {
  const overlay = document.getElementById("term-overlay");
  const win = document.getElementById("term-win");
  const body = document.getElementById("term-body");
  const input = document.getElementById("term-input");
  const toggleBtn = document.getElementById("term-toggle-btn");
  let isOpen = false;
  let history = [];
  let histIdx = -1;

  const PROJECTS = [
    { title: "matha-lib", kind: "Python package" },
    { title: "hyprcursor-sync-git", kind: "AUR project" },
    { title: "Tauri Authenticator", kind: "Desktop app" },
  ];
  const SKILLS = [
    { label: "Code", list: "JavaScript · Python · C++ · Tauri" },
    { label: "Hardware", list: "ESP32" },
    { label: "Web", list: "HTML · CSS" },
    { label: "Design", list: "UI/UX · Figma · Inkscape · Canva" },
  ];
  const BOOT = [
    ["td", "  ╔══════════════════════════════════════╗"],
    ["td", '    <span class="th">C O S M I C   T E R M I N A L</span>  '],
    ["td", '          <span class="tc">AstroJr0 @ void : ~</span>         '],
    ["td", "  ╚══════════════════════════════════════╝"],
    ["to", ""],
    [
      "ts",
      '  System boot complete. Reality: <span class="tw">questionable</span>.',
    ],
    ["to", '  Type <span class="th">help</span> for available commands.'],
    ["to", ""],
  ];

  const CMDS = {
    help: () => [
      ["th", "  available commands:"],
      ["to", ""],
      ["to", '  <span class="tc">about</span>              — who am i'],
      ["to", '  <span class="tc">projects</span>           — what i\'ve built'],
      ["to", '  <span class="tc">skills</span>             — my arsenal'],
      [
        "to",
        '  <span class="tc">contact</span>            — find me in the void',
      ],
      ["to", '  <span class="tc">clear</span>              — wipe the slate'],
      ["to", '  <span class="tc">exit</span>               — close terminal'],
      ["to", ""],
      ["th", "  reality manipulation:"],
      ["to", '  <span class="tc">spawn-planet</span>       — add a planet'],
      [
        "to",
        '  <span class="tc">summon-blackhole</span>   — <span class="tw">swallows the universe</span>',
      ],
      ["to", ""],
      [
        "ts",
        '  tip: type <span class="th">supernova</span> anywhere on the page.',
      ],
      ["to", ""],
    ],
    about: () => [
      ["th", "  // about jayed"],
      ["to", ""],
      ["to", "  student software developer drifting through code and space."],
      ["to", ""],
      [
        "ts",
        "  current status: adrift somewhere between JavaScript and the event horizon.",
      ],
      ["to", ""],
    ],
    projects: () => {
      const lines = [
        ["th", "  // projects"],
        ["to", ""],
      ];
      PROJECTS.forEach((p) =>
        lines.push([
          "to",
          `  <span class="tc">→</span> <span class="th">${p.title}</span> <span class="td">· ${p.kind}</span>`,
        ]),
      );
      lines.push(
        ["to", ""],
        ["ts", "  scroll to #projects for details."],
        ["to", ""],
      );
      return lines;
    },
    skills: () => {
      const lines = [
        ["th", "  // skills"],
        ["to", ""],
      ];
      SKILLS.forEach((s) =>
        lines.push([
          "to",
          `  <span class="tc">${s.label.toLowerCase()}:</span> <span class="th">${s.list}</span>`,
        ]),
      );
      lines.push(["to", ""]);
      return lines;
    },
    contact: () => [
      ["th", "  // contact"],
      ["to", ""],
      [
        "to",
        '  <span class="tc">email</span>  <span class="th">rehanjayed01@gmail.com</span>',
      ],
      [
        "to",
        '  <span class="tc">github</span> <span class="th">github.com/AstroJr0</span>',
      ],
      [
        "to",
        '  <span class="tc">insta</span>  <span class="th">@astro_ren0</span>',
      ],
      ["to", ""],
    ],
    clear: () => {
      body.innerHTML = "";
      return [];
    },
    exit: () => {
      setTimeout(close, 280);
      return [
        ["ts", "  closing terminal..."],
        ["to", ""],
      ];
    },
  };

  function line(html, cls) {
    const p = document.createElement("p");
    p.className = `tl ${cls}`;
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }
  function open() {
    isOpen = true;
    overlay.classList.remove("term-hidden");
    toggleBtn?.classList.add("active");
    if (!body.innerHTML.trim()) BOOT.forEach(([c, h]) => line(h, c));
    setTimeout(() => input.focus(), 40);
  }
  function close() {
    isOpen = false;
    overlay.classList.add("term-hidden");
    toggleBtn?.classList.remove("active");
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(cmd);
    histIdx = -1;
    line(`<span class="tc">❯ ${cmd.replace(/</g, "&lt;")}</span>`, "tl");
    if (CMDS[cmd]) {
      (CMDS[cmd]() || []).forEach(([c, h]) => line(h, c));
    } else if (window.CE?.cmds?.[cmd]) {
      (window.CE.cmds[cmd]() || []).forEach(([c, h]) => line(h, c));
    } else {
      line(
        `  <span class="te">command not found: ${cmd.replace(/</g, "&lt;")}</span>`,
        "tl",
      );
      line(
        '  type <span class="th">help</span> to see available commands.',
        "to",
      );
      line("", "to");
    }
  }

  input.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      const v = input.value;
      input.value = "";
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) input.value = history[++histIdx];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      histIdx = Math.max(-1, histIdx - 1);
      input.value = histIdx >= 0 ? history[histIdx] : "";
    } else if (e.key === "Escape") {
      close();
    }
  });

  toggleBtn?.addEventListener("click", () => (isOpen ? close() : open()));
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.ctrlKey && e.code === "Backquote") {
        e.preventDefault();
        isOpen ? close() : open();
      }
    },
    { capture: true },
  );
  document.getElementById("term-close")?.addEventListener("click", close);

  let drag = false,
    ox = 0,
    oy = 0;
  document.getElementById("term-header")?.addEventListener("mousedown", (e) => {
    drag = true;
    const r = win.getBoundingClientRect();
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    win.style.transition = "none";
    overlay.style.bottom = "auto";
    overlay.style.right = "auto";
    overlay.style.left = r.left + "px";
    overlay.style.top = r.top + "px";
  });
  window.addEventListener("mousemove", (e) => {
    if (!drag) return;
    overlay.style.left =
      Math.max(0, Math.min(e.clientX - ox, window.innerWidth - 40)) + "px";
    overlay.style.top =
      Math.max(0, Math.min(e.clientY - oy, window.innerHeight - 40)) + "px";
  });
  window.addEventListener("mouseup", () => {
    drag = false;
  });
})();
