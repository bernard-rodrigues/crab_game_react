import { useContext } from "react";
import { TurnContext } from "../contexts/TurnContext";

interface MenuButtonProps {
    gameState: number
    title: string
    isModal: boolean
}

export const MenuButton = (props: MenuButtonProps) => {
    const { handleGameStateChange } = useContext(TurnContext);

    return (
        <button 
            className={`
                font-ribeye
                text-main-text border-main-text px-3 py-1 border-2 bg-linear-to-br from-slate-100 to-slate-50 shadow-xl
                hover:bg-linear-to-br hover:from-slate-200 hover:to-slate-100 hover:cursor-pointer transition-colors duration-150
                ${props.isModal ? "mt-5" : "text-3xl md:text-5xl lg:text-4xl"}
                select-none
            `}
            onClick={() => handleGameStateChange(props.gameState)}
        >
            {props.title}
        </button>
    );
}