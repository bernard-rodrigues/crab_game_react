import { useContext } from "react";
import { TurnContext } from "../contexts/TurnContext";

interface MenuButtonProps {
    gameState: number;
    title: string
}

export const MenuButton = (props: MenuButtonProps) => {
    const { handleGameStateChange } = useContext(TurnContext);

    return (
        <button 
            className="
                text-main-text border-main-text p-3 border-2 text-3xl bg-linear-to-br from-slate-300 to-slate-200 shadow-xl
                hover:bg-linear-to-br hover:from-slate-100 hover:to-slate-50 hover:cursor-pointer transition-colors duration-150
                md:text-5xl
                lg:text-4xl
            "
            onClick={() => handleGameStateChange(props.gameState)}
        >
            {props.title}
        </button>
    );
}