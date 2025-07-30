import { useContext } from "react";
import { Board } from "../components/Board"
import { TurnTextbox } from "../components/TurnTextbox"
import { TurnContext } from "../contexts/TurnContext";
import { ExitDoor } from "../components/ExitDoor";
import { Repeat } from "../components/Repeat";

export const InGame = () => {
    const {currentPlayer, screenWidth, gameState} = useContext(TurnContext);
    
    return(
        <>
            <Repeat />
            <ExitDoor />
            {gameState === 1 || gameState === 2 ? 
            <>
                <TurnTextbox currentPlayer={currentPlayer} screenWidth={screenWidth} textBoxOwner={1}/>
                <TurnTextbox currentPlayer={currentPlayer} screenWidth={screenWidth} textBoxOwner={2}/>
            </> : <></> 
            }
            <Board />
        </>
    );
}