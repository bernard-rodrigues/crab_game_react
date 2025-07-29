import { useEffect, useState } from "react";
import { TurnContext } from "./contexts/TurnContext";
import { InGame } from "./pages/InGame";
import { MainMenu } from "./pages/MainMenu";
import { HowToPlay } from "./pages/HowToPlay";

export const App = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPlayer, setCurrentPlayer] = useState(() => Math.random() < 0.5 ? 1 : 2);

  const [gameState, setGameState] = useState(0); // 0: not started, 1: local, 2: vs CPU, 3: how to play, 4: game over
  const [isAIMode, setIsAIMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1); 
  }

  const handleGameStateChange = (newState: number) => {
    if(newState === 1){
      setCurrentPlayer(Math.random() < 0.5 ? 1 : 2); // Randomly assign starting player
    }
    setGameState(newState);
  }

  const handleIsAIMode = (state: boolean) => {
    setIsAIMode(state);
  }
  
  return (
    <TurnContext.Provider value={{
      currentPlayer,
      togglePlayer,
      screenWidth,
      gameState,
      handleGameStateChange,
      isAIMode,
      handleIsAIMode
    }}>
      <main 
        className="relative h-screen w-screen font-ribeye transition-all duration-500 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to right, hsl(211, 100%, 80%) 0%, hsl(211, 100%, 65%) 50%, hsl(354, 70%, 68%) 50%, hsl(354, 70%, 83%) 100%)",
          backgroundSize: gameState === 1 || gameState === 2 ? "200% 100%" : "100% 100%",
          backgroundPosition: `${currentPlayer === 1 ? "0% 0%" : "100% 0%"}`
        }}
      >
        {gameState === 0
          ? <MainMenu /> : gameState === 3
          ? <HowToPlay /> : <InGame />
        }

      </main>
    </TurnContext.Provider>
  )
}