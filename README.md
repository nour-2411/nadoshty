# 🎁 Nada's Birthday Surprise Website

A handmade interactive birthday gift: Intro → Countdown → Celebration → Letter → Memories → Mini-Game → Final Gift.

## How to run it
1. Open this folder in VS Code.
2. Install the **Live Server** extension (if you don't have it).
3. Right-click `index.html` → **Open with Live Server**.

That's it — no build step, no backend, no dependencies.

## How to personalize everything

All of the editable content lives at the very top of **`script.js`**, inside the `CONFIG` object:

- **`birthday`** — the exact date/time the countdown ends and the celebration unlocks. Format: `new Date(YEAR, MONTH-1, DAY, HOUR, MINUTE)`. Note `MONTH` is 0-indexed (January = 0), so August = `7`.
- **`musicSrc`** — path to your background music file. Drop any `.mp3`/`.ogg` file into `assets/` and point to it here (currently `assets/music.mp3` — that file isn't included, so add your own).
- **`letterMessage`** — the full letter text shown letter-by-letter on screen 4.
- **`memories`** — an array of memory cards. Set `img: "assets/your-photo.jpg"` (and drop the photo into `assets/`) to replace a placeholder, or leave `img: null` to keep the placeholder heart icon. Edit `date` and `caption` freely.
- **`heartsNeeded`** — how many hearts must be tapped in the mini-game before the final gift unlocks (default 10).

Everything else (screen text like the intro lines, celebration titles, final reveal message) lives directly in `index.html` if you want to tweak wording — search for the Arabic/Franco text and edit in place.

## Notes
- Music will **not** autoplay — that's intentional (browsers block it). It starts right after Nada taps the first button, with a gentle fade-in. The 🔊/🔇 button top-right lets her mute/unmute any time.
- If the birthday moment has already passed when the page loads, it jumps straight to the celebration screen instead of showing a countdown.
- The mini-game works with both mouse clicks and touch taps.
- Everything is a single self-contained front-end (`index.html`, `style.css`, `script.js`, `assets/`) — no server or database needed.
