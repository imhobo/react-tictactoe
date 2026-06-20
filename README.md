<div align="center">

# ✦ Tic-Tac-Toe

### A beautifully crafted Tic-Tac-Toe game — play with a friend or challenge the AI.

[![Live Demo](https://img.shields.io/badge/demo-tic.babymonks.com-brightgreen)](https://tic.babymonks.com)
[![React](https://img.shields.io/badge/react-17.0.2-61DAFB?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**[🌐 Play Now → tic.babymonks.com](https://tic.babymonks.com)**

</div>

---

## ✨ Features

- **👥 2-Player Mode** — Pass-and-play with a friend on the same device.
- **🤖 vs AI** — Challenge an unbeatable minimax AI opponent.
- **🏆 Score Tracking** — X wins, O wins, and draws persist across sessions via localStorage.
- **↩️ Undo** — Undo your last move in 2-player mode.
- **🎊 Celebration** — Confetti rain when a game ends.
- **✨ Animated X & O** — Buttery-smooth CSS-drawn X and O with draw animations.
- **🎨 Gradient Glassmorphism** — Elegant dark gradient with glass card board.
- **📱 Mobile-First** — Responsive layout that looks great on any screen.

---

## 🚀 Live Demo

Try it right now: **[tic.babymonks.com](https://tic.babymonks.com)**

---

## 🛠️ Tech Stack

| Tech | Version |
|------|---------|
| [React](https://reactjs.org/) | 17.0.2 |
| [Create React App](https://create-react-app.dev/) | 5.0.0 |
| Node.js | 20 (CI) |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 14
- npm (ships with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/imhobo/react-tictactoe.git
cd react-tictactoe

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app. The page will reload when you make changes.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build/` folder. It bundles React in production mode and optimises for the best performance.

---

## 🔁 CI/CD

This project uses **Woodpecker CI** with a local runner. Every push to `main` triggers:

1. `install` — npm ci
2. `build` — Production bundle
3. `artifact` — Uploads `react-tictactoe-build-{PIPELINE_NUM}-{YYYYMMDD}.tar.gz` to GitHub Releases
4. `deploy` — Ships the build to **[tic.babymonks.com](https://tic.babymonks.com)**

The pipeline config lives at `.woodpecker.yml`.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/imhobo">imhobo</a>
</div>
