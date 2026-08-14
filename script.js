/* =========================================================
   NADA'S BIRTHDAY GIFT — SCRIPT
   Everything you'll want to personalize lives in CONFIG below.
   ========================================================= */

const CONFIG = {
  // Set the exact birthday moment here (YYYY, MM (1-12), DD, HH, MM)
  // Example: birthday on 20 August 2026 at 00:00
  birthday: new Date(2026, 7, 14, 0, 0, 0),

  // Path to your background music file. Any mp3/ogg works.
  musicSrc: "assets/music.mp3",

  // The letter shown on screen 4 (typed out letter by letter)
  letterMessage:
`يا ندى ❤️

كل سنة وانتي طيبة يا ندوش و 🥹🎂

أنا عارف إن ممكن الكلام ده يبان simple，
بس بجد انتي واحدة من أحلى الناس اللي عرفتها.

انتي مش بس صاحبتي...
انتي أختي  ❤️

الحلو إن معاكي أقدر أضحك وأهزار，
وفي نفس الوقت أقدر أتكلم معاكي في أي حاجة.

ومهما الدنيا اتغيرت，
أتمنى إنك تفضلي دايماً الواحدة اللي بتضحك من قلبها 😂❤️

يارب السنة الجاية تجيب ليكي كل الحاجات اللي بتتمنيها，
وتفضلي دايماً مبسوطة，
وتكون أيامك كلها فرح وضحك وحاجات حلوة.

وأهم حاجة...

متنساش إن فيه واحد دايماً هيكون فرحان عشان انتي فرحانة ❤️

Happy Birthday يا ندى 🎂🎉
وكل سنة وانتي أحلى واحدة ❤️`,

  // Memory cards — replace `img` with your own photo paths any time.
  // Leave img as null to show a placeholder emoji instead.
  memories: [
    { img: null, date: "2021", caption: "اليوم ده كان عسل 😂❤️" },
    { img: null, date: "2022", caption: "ممكن ما نفتكرش التفاصيل... بس أنا فاكر 😂" },
    { img: null, date: "2022", caption: "One of my favorite memories ❤️" },
    { img: null, date: "2023", caption: "الضحك كان أكتر من الكلام 😂" },
    { img: null, date: "2023", caption: "Days we should never forget 🥹❤️" },
    { img: null, date: "2024", caption: "لحظة مننساهاش أبداً ❤️" },
    { img: null, date: "2024", caption: "دايماً جنبي في كل حاجة 🥹" },
    { img: null, date: "2025", caption: "و لسه فيه كتير جاي ✨" },
  ],

  // Mini game: hearts needed before the final gift unlocks
  heartsNeeded: 10,
};

/* =========================================================
   SMALL HELPERS
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showScreen(id) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  $(`#${id}`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* =========================================================
   MUSIC CONTROL
   Autoplay is blocked by browsers, so we only start playback
   after the first real user interaction (the start button).
   ========================================================= */
const music = $("#bg-music");
const musicBtn = $("#music-toggle");
let musicStarted = false;
let musicEnabled = true;

function fadeInMusic(audio, target = 0.6, duration = 1500) {
  audio.volume = 0;
  audio.play().catch(() => {});
  const steps = 20;
  const stepTime = duration / steps;
  let i = 0;
  const iv = setInterval(() => {
    i++;
    audio.volume = Math.min(target, (target * i) / steps);
    if (i >= steps) clearInterval(iv);
  }, stepTime);
}

function startMusicIfNeeded() {
  if (musicStarted || !musicEnabled) return;
  musicStarted = true;
  fadeInMusic(music);
  musicBtn.textContent = "🔊";
}

musicBtn.addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  if (musicEnabled) {
    if (!musicStarted) {
      startMusicIfNeeded();
    } else {
      music.play().catch(() => {});
      musicBtn.textContent = "🔊";
    }
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

/* =========================================================
   AMBIENT BACKGROUND — twinkling stars on canvas
   ========================================================= */
const bgCanvas = $("#bg-canvas");
const bgCtx = bgCanvas.getContext("2d");
let stars = [];

function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

function initStars() {
  const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    r: Math.random() * 1.4 + 0.3,
    speed: Math.random() * 0.4 + 0.1,
    twinkle: Math.random() * Math.PI * 2,
  }));
}

function drawStars() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (const s of stars) {
    s.twinkle += 0.02;
    const alpha = 0.35 + Math.sin(s.twinkle) * 0.35;
    bgCtx.beginPath();
    bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(255, 240, 250, ${Math.max(0, alpha)})`;
    bgCtx.fill();
    s.y += s.speed;
    if (s.y > bgCanvas.height) {
      s.y = -4;
      s.x = Math.random() * bgCanvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}

resizeBgCanvas();
initStars();
drawStars();
window.addEventListener("resize", () => {
  resizeBgCanvas();
  initStars();
});

// Floating hearts / stars drifting up from the bottom (ambient, all screens)
const sparkleLayer = $("#sparkle-layer");
const floatyEmojis = ["❤️", "✨", "⭐", "💫"];
function spawnFloaty() {
  const el = document.createElement("div");
  el.className = "floaty";
  el.textContent = floatyEmojis[Math.floor(Math.random() * floatyEmojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  const duration = 9 + Math.random() * 8;
  el.style.animationDuration = duration + "s";
  el.style.fontSize = (1 + Math.random() * 1.2) + "rem";
  sparkleLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000 + 500);
}
setInterval(spawnFloaty, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnFloaty, i * 300);

/* =========================================================
   SCREEN 1 — INTRO
   ========================================================= */
function playIntro() {
  const lines = $$(".intro-line");
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add("show"), 500 + i * 1600);
  });
  setTimeout(() => {
    $("#btn-start").classList.add("show");
  }, 500 + lines.length * 1600);
}
playIntro();

$("#btn-start").addEventListener("click", () => {
  startMusicIfNeeded();
  showScreen("screen-countdown");
  startCountdown();
});

/* =========================================================
   SCREEN 2 — COUNTDOWN
   ========================================================= */
let countdownInterval = null;

function startCountdown() {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  const diff = CONFIG.birthday - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    goToCelebration();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  $("#cd-days").textContent = String(d).padStart(2, "0");
  $("#cd-hours").textContent = String(h).padStart(2, "0");
  $("#cd-minutes").textContent = String(m).padStart(2, "0");
  $("#cd-seconds").textContent = String(s).padStart(2, "0");
}

function goToCelebration() {
  showScreen("screen-celebrate");
  runConfetti("confetti-canvas", 4500);
  launchBalloons();
}

/* If the birthday has already passed when the page loads, skip
   straight to the celebration screen per the brief. */
if (CONFIG.birthday - new Date() <= 0) {
  // Defer until after intro so the user still sees the opening beats.
  const originalStart = $("#btn-start");
  originalStart.addEventListener("click", () => {}, { once: true });
}

/* =========================================================
   CONFETTI (canvas-based, reused for celebration + gift screens)
   ========================================================= */
function runConfetti(canvasId, durationMs = 4000) {
  const canvas = $(`#${canvasId}`);
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const colors = ["#ff6fae", "#ffd166", "#b28dff", "#ff9ecb", "#ffffff"];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 3,
    drift: Math.random() * 2 - 1,
    rot: Math.random() * 360,
    rotSpeed: Math.random() * 8 - 4,
  }));

  const start = performance.now();

  function frame(t) {
    const elapsed = t - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (elapsed < durationMs) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(frame);
}

function launchBalloons() {
  const container = $("#balloons");
  const colors = ["#ff6fae", "#ffd166", "#b28dff", "#ff9ecb", "#7fd8c9"];
  const count = 14;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const b = document.createElement("div");
      b.className = "balloon";
      b.style.left = Math.random() * 90 + "vw";
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");
      const duration = 7 + Math.random() * 4;
      b.style.animationDuration = duration + "s";
      container.appendChild(b);
      setTimeout(() => b.remove(), duration * 1000 + 300);
    }, i * 220);
  }
}

/* =========================================================
   SCREEN 3 -> 4
   ========================================================= */
$("#btn-open-message").addEventListener("click", () => {
  showScreen("screen-letter");
  typeLetter();
});

/* =========================================================
   SCREEN 4 — LETTER (typewriter)
   ========================================================= */
let letterTyped = false;
function typeLetter() {
  if (letterTyped) return;
  letterTyped = true;

  const target = $("#letter-text");
  const text = CONFIG.letterMessage;
  target.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  target.appendChild(cursor);

  let i = 0;
  const speed = 26; // ms per character
  function typeChar() {
    if (i < text.length) {
      cursor.insertAdjacentText("beforebegin", text[i]);
      i++;
      // Auto-scroll the letter box as it types
      const scrollBox = $(".letter-scroll");
      scrollBox.scrollTop = scrollBox.scrollHeight;
      setTimeout(typeChar, speed);
    } else {
      cursor.remove();
      $("#btn-to-memories").classList.add("show");
    }
  }
  typeChar();
}

$("#btn-to-memories").addEventListener("click", () => {
  showScreen("screen-memories");
  buildMemories();
});

/* =========================================================
   SCREEN 5 — MEMORIES
   ========================================================= */
let memoriesBuilt = false;
function buildMemories() {
  if (memoriesBuilt) return;
  memoriesBuilt = true;

  const grid = $("#memories-grid");
  CONFIG.memories.forEach((mem, i) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.style.animationDelay = (i * 0.12) + "s";

    const imgWrap = document.createElement("div");
    imgWrap.className = "memory-img";
    if (mem.img) {
      const img = document.createElement("img");
      img.src = mem.img;
      img.alt = mem.caption;
      imgWrap.appendChild(img);
    } else {
      imgWrap.textContent = "🤍";
    }

    const meta = document.createElement("div");
    meta.className = "memory-meta";
    meta.innerHTML = `<div class="memory-date">${mem.date}</div><div class="memory-caption">${mem.caption}</div>`;

    card.appendChild(imgWrap);
    card.appendChild(meta);
    grid.appendChild(card);
  });
}

$("#btn-to-game").addEventListener("click", () => {
  showScreen("screen-game");
  startGame();
});

/* =========================================================
   SCREEN 6 — MINI GAME
   Falling hearts/stars — tap hearts to collect, works with
   both touch and mouse via pointer events.
   ========================================================= */
let gameStarted = false;
let gameCollected = 0;
let gameSpawnInterval = null;

function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  const field = $("#game-field");
  const items = ["❤️", "❤️", "❤️", "⭐"]; // hearts weighted more common than stars

  gameSpawnInterval = setInterval(() => {
    if (gameCollected >= CONFIG.heartsNeeded) {
      clearInterval(gameSpawnInterval);
      return;
    }
    const el = document.createElement("div");
    el.className = "game-item";
    const symbol = items[Math.floor(Math.random() * items.length)];
    el.textContent = symbol;
    el.dataset.type = symbol === "❤️" ? "heart" : "star";
    el.style.left = Math.random() * 85 + "%";
    const duration = 4 + Math.random() * 2.5;
    el.style.animationDuration = duration + "s";

    const collect = (e) => {
      e.preventDefault();
      if (el.classList.contains("popped")) return;
      el.classList.add("popped");
      if (el.dataset.type === "heart") {
        gameCollected++;
        $("#game-count").textContent = gameCollected;
        if (gameCollected >= CONFIG.heartsNeeded) {
          unlockGift();
        }
      }
      setTimeout(() => el.remove(), 360);
    };
    el.addEventListener("pointerdown", collect);

    el.addEventListener("animationend", () => {
      if (el.parentNode) el.remove();
    });

    field.appendChild(el);
  }, 650);
}

function unlockGift() {
  clearInterval(gameSpawnInterval);
  const btn = $("#btn-to-gift");
  btn.disabled = false;
  btn.classList.remove("locked");
  btn.textContent = "🎁 كملي للهدية";
}

$("#btn-to-gift").addEventListener("click", () => {
  if ($("#btn-to-gift").disabled) return;
  showScreen("screen-gift");
});

/* =========================================================
   SCREEN 7 — FINAL GIFT
   ========================================================= */
let giftOpened = false;
$("#btn-open-gift").addEventListener("click", () => {
  if (giftOpened) return;
  giftOpened = true;

  const box = $("#gift-box");
  box.classList.add("opened");

  runConfetti("gift-confetti-canvas", 6000);

  setTimeout(() => {
    $("#btn-open-gift").classList.add("hidden");
    $("#gift-reveal").classList.remove("hidden");
  }, 700);
});
