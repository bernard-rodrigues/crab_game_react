import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { TurnContext } from "./contexts/TurnContext";
import { TurnTextbox } from "./components/TurnTextbox";

export const App = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPlayer, setCurrentPlayer] = useState(() => Math.random() < 0.5 ? 1 : 2);

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
  
  return (
    <TurnContext.Provider value={{
      currentPlayer,
      togglePlayer
    }}>
      <main 
        className="relative h-screen w-screen font-ribeye transition-all duration-500"
        style={{
          backgroundImage: "linear-gradient(to right, hsl(211, 100%, 80%) 0%, hsl(211, 100%, 65%) 50%, hsl(354, 70%, 68%) 50%, hsl(354, 70%, 83%) 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: `${currentPlayer === 1 ? "0% 0%" : "100% 0%"}`
        }}
      >
        <TurnTextbox currentPlayer={currentPlayer} screenWidth={screenWidth} textBoxOwner={1}/>
        <TurnTextbox currentPlayer={currentPlayer} screenWidth={screenWidth} textBoxOwner={2}/>
        <Board />
      </main>
    </TurnContext.Provider>
  )
}