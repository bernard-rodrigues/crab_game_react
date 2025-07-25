import { useState } from "react"
import { Board } from "./components/Board"
import { TurnContext } from "./contexts/TurnContext";

export const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState(() => Math.random() < 0.5 ? 1 : 2);

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1); 
  }
  
  return (
    <TurnContext.Provider value={{
      currentPlayer,
      togglePlayer
    }}>
      <main 
        className="relative h-screen w-screen"
        style={{
          backgroundImage: 
            currentPlayer === 1 ? 
            "linear-gradient(to bottom, hsl(211, 100%, 80%), hsl(211, 100%, 70%))" :
            "linear-gradient(to bottom, hsl(354, 70%, 83%), hsl(354, 70%, 73%))",
        }}
      >
        <h1 className="text-main-text text-xl absolute top-1/8 -translate-y-1/2 left-1/2 -translate-1/2">Player {currentPlayer} turn</h1>
        <Board />
      </main>
    </TurnContext.Provider>
  )
}