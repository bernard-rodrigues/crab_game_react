import { useContext } from "react";
import repeat from "../assets/images/repeat.svg";
import { TurnContext } from "../contexts/TurnContext";

export const Repeat = () => {
    const { handleReset, gameState, handleGameStateChange, isAIMode } = useContext(TurnContext);
    
    return (
        <img 
            src={repeat} 
            alt="Repeat sign" 
            className="fixed left-3 top-3 w-10 md:w-14 lg:w-12 hover:cursor-pointer" 
            onClick={gameState === 4 ? () => (handleGameStateChange(isAIMode ? 2 : 1)) : () => handleReset(true)}
        />
    );
}