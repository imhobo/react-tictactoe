# Tic-Tac-Toe UI Redesign + CI/CD

**Goal:** Redesign the Tic-Tac-Toe UI to look professionally made, add lean useful features, and set up Woodpecker CI/CD with GitHub artifact upload.

## Changes

1. **UI Redesign** — Replace inline styles with elegant CSS, glassmorphism board, animated X/O, gradient background
2. **Features** — Score tracking (localStorage), undo move (2-player), better AI (minimax), move counter
3. **CI/CD** — Woodpecker with install → build → artifact upload → deploy

## Files Changed
- `public/index.html` — title, fonts
- `src/index.css` — complete rewrite
- `src/App.js` — score state, pass to Game
- `src/component/Game.js` — major rewrite
- `src/component/Layout.js` — minimal
- `src/component/Box.js` — animated X/O
- `src/component/Logic.js` — add minimax AI
- `.woodpecker.yml` — add artifact upload
- `README.md` — updated
