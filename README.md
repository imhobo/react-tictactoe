<div align="center">

# 🎮 Tic-Tac-Toe

### A classic Tic-Tac-Toe game built with React — play with a friend or challenge the AI!

[![GitHub Actions Status](https://github.com/imhobo/react-tictactoe/actions/workflows/deploy.yml/badge.svg)](https://github.com/imhobo/react-tictactoe/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-tic.babymonks.com-brightgreen)](https://tic.babymonks.com)
[![React](https://img.shields.io/badge/react-17.0.2-61DAFB?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**[🌐 Live Demo → tic.babymonks.com](https://tic.babymonks.com)**

</div>

---

## ✨ Features

- **👥 2-Player Mode** — Pass-and-play with a friend on the same device.
- **🤖 1-Player vs AI** — Challenge an unbeatable(ish) computer opponent with smart move selection.
- **🎊 Celebration Effects** — Confetti rain and a glowing "Winner" announcement when you win.
- **🏆 Winning Highlight** — The winning line lights up with a gold glow.
- **🔄 Play Again** — Quick reset button after every game, win or draw.
- **📱 Responsive** — Works on desktop and mobile browsers.

---

## 🚀 Live Demo

Try it right now: **[tic.babymonks.com](https://tic.babymonks.com)**

---

## 🛠️ Tech Stack

| Tech | Version |
|---|---|
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

Open [http://localhost:3000](http://localhost:3000) to see the app in your browser. The page will reload when you make changes.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build/` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

---

## 🔁 CI/CD

This project uses **GitHub Actions** for continuous integration and deployment. Every push to the `main` branch triggers an automated workflow that:

1. Installs dependencies (`npm ci`)
2. Builds the production bundle (`npm run build`)
3. Deploys to **[tic.babymonks.com](https://tic.babymonks.com)**

The workflow file lives at `.github/workflows/deploy.yml`.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 Make your changes
4. ✅ Commit (`git commit -m 'Add amazing feature'`)
5. 📤 Push (`git push origin feature/amazing-feature`)
6. 🔀 Open a Pull Request

Please make sure your code follows the existing style and passes any lint checks.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/imhobo">imhobo</a>
</div>
