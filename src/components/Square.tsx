import { useContext } from "react";
import { TurnContext } from "../contexts/TurnContext";

interface SquareProps {
    squareId: number;
    moveCrabFunction: (squareId: number) => void;
    checkAvailabilityFunction: (squareId: number) => boolean;
}

export const Square = (props: SquareProps) => {
    const {currentPlayer} = useContext(TurnContext);
    
    return(
        <div
            id={`square-${props.squareId}`}
            key={props.squareId}
            className={`w-full h-full ${
                ((Math.floor(props.squareId / 6) + props.squareId % 6) % 2 === 0 ? "bg-linear-to-br from-slate-300 to-slate-200" : "bg-linear-to-br from-slate-100 to-slate-50")
            }`}
            onClick={() => props.moveCrabFunction(props.squareId)}
        >
            {/* Possible positions shadow */}
            <div 
                className="w-full h-full rounded-full transition-all duration-300 cursor-pointer"
                style={{
                    opacity: props.checkAvailabilityFunction(props.squareId) ? "0.35" : "0",
                    backgroundColor: currentPlayer === 1 ? "hsl(211, 100%, 50%)" : "hsl(354, 70%, 53%)",
                    scale: props.checkAvailabilityFunction(props.squareId) ? "0.9" : "0"
                }}
            />
        </div>
    )
}