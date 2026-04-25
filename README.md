# 🦀 Crab Game (Crab Connect)

Crab Connect is a strategic board game where players move crabs across a 6x6 grid with the goal of aligning four of their crabs horizontally or vertically. Challenge a friend in two-player mode or test your skills against a sophisticated AI opponent!

## 📋 Table of Contents
- [Description](#-description)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Execution (Development)](#-execution-development)
- [Execution (Production)](#-execution-production)
- [Deployment](#-deployment)
- [AI Logic Details](#-ai-logic-details)

## 📖 Description
The game board consists of a 6x6 grid. Each player controls a set of crabs. Crabs move horizontally or vertically until they hit another crab or the edge of the board. The objective is to be the first to align four crabs in a row (horizontal or vertical).

## ✨ Key Features
- **Two Player Mode:** Compete against a friend locally.
- **AI Opponent:** Play against a Minimax-based AI with multiple difficulty levels.
- **Intuitive Movement:** Visual indicators show available moves when a crab is selected.
- **Win Detection:** Automatic detection of horizontal and vertical winning lines.
- **Responsive Design:** Optimized for various screen sizes, from mobile to desktop.

## 🛠 Tech Stack
- **Framework:** [React 19](https://react.dev/) (TypeScript)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Material UI (MUI)](https://mui.com/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **State Management:** React Context API
- **Deployment:** GitHub Pages

## ⚙️ Prerequisites
Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bernard-rodrigues/crab_game_react.git
   cd crab_game_react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## 💻 Execution (Development)
To start the development server:
```bash
npm run dev
```
Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

## 🏗 Execution (Production)
To build the project for production:
```bash
npm run build
```
The optimized output will be generated in the `dist/` directory. You can preview the production build locally with:
```bash
npm run preview
```

## 🚢 Deployment
The project is configured for deployment to GitHub Pages. To deploy:
```bash
npm run deploy
```
*Note: Ensure the `homepage` field in `package.json` matches your deployment URL.*

## 🧠 AI Logic Details
The AI opponent implements the **Minimax Algorithm** with **Alpha-Beta Pruning** to search for optimal moves. The decision-making process is guided by a heuristic evaluation function that weights:
- **Immediate Win/Loss:** Highest priority to secure a win or block an opponent's winning move.
- **Line Formation:** Scoring for 2 or 3 crabs in a row that can potentially lead to a win.
- **Mobility:** Calculating available moves to maximize its own options while restricting the opponent.

---
Built with ❤️ by [Bernard Rodrigues](https://github.com/bernard-rodrigues)
