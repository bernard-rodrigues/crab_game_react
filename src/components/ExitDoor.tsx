import { useContext } from "react";
import door from "../assets/images/door.svg";
import { TurnContext } from "../contexts/TurnContext";

export const ExitDoor = () => {
    const { handleGameStateChange } = useContext(TurnContext);
    
    return (
        <img src={door} alt="Exit door" className="fixed right-1 top-1 w-10 md:w-14 lg:w-12 hover:cursor-pointer" onClick={() => handleGameStateChange(0)} />
    );
}