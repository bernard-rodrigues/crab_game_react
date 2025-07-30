import { useEffect, useState } from "react";
import { TurnContext } from "./contexts/TurnContext";
import { InGame } from "./pages/InGame";
import { MainMenu } from "./pages/MainMenu";
import { HowToPlay } from "./pages/HowToPlay";
import { LevelSelect } from "./pages/LevelSelect";

export const App = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPlayer, setCurrentPlayer] = useState(() => Math.random() < 0.5 ? 1 : 2);

  // 0: not started 
  // 1: local
  // 2: vs CPU
  // 3: how to play
  // 4: game over
  // 5: level select
  const [gameState, setGameState] = useState(0);
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiLevel, setAILevel] = useState(1);
  const [reset, setReset] = useState(false);

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
  };

  const randomizePlayer = () => {
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2); // Randomly assign starting player
  }

  const handleGameStateChange = (newState: number) => {
    if(newState === 1 || newState === 2){
      randomizePlayer();
    }
    setGameState(newState);
  };

  const handleIsAIMode = (state: boolean) => {
    setIsAIMode(state);
  };

  const handleAILevel = (level: number) => {
    setAILevel(level);
  }

  const handleReset = (state: boolean) =>{
    setReset(state);
  }
  
  return (
    <TurnContext.Provider value={{
      currentPlayer,
      randomizePlayer,
      togglePlayer,
      screenWidth,
      gameState,
      handleGameStateChange,
      isAIMode,
      handleIsAIMode,
      aiLevel,
      handleAILevel,
      reset,
      handleReset
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
          ? <HowToPlay /> : gameState === 5
          ? <LevelSelect /> : <InGame />
        }

      </main>
    </TurnContext.Provider>
  );
};