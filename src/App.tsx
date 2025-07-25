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
        className="relative h-screen w-screen font-ribeye"
        style={{
          backgroundImage: 
            currentPlayer === 1 ? 
            "linear-gradient(to bottom, hsl(211, 100%, 80%), hsl(211, 100%, 65%))" :
            "linear-gradient(to bottom, hsl(354, 70%, 83%), hsl(354, 70%, 68%))",
        }}
      >
        <h1 className="
          text-main-text text-4xl md:text-6xl text-center 
          w-full absolute top-1/8 left-1/2 -translate-x-1/2
          md:top-16
          lg:text-left lg:translate-x-0 lg:w-auto lg:left-8 lg:text-3xl
        ">
          Player {currentPlayer} turn
        </h1>
        <Board />
      </main>
    </TurnContext.Provider>
  )
}