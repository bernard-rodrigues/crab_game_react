import { useContext, useState } from "react";
import type { CrabObject } from "../types/types"
import { TurnContext } from "../contexts/TurnContext";

interface CrabProps{
    crab: CrabObject
    handleCrabActiveFunction: (crab: CrabObject) => void
}

export const Crab = (props: CrabProps) => {
    const {currentPlayer} = useContext(TurnContext);
    
    const [isHovered, setIsHovered] = useState(false);
    
    const crabStyle = {
        left: `${(props.crab.x/6)*100}%`,
        top: `${(props.crab.y/6)*100}%`,

        transform: `scale(${props.crab.active ? 1 : props.crab.player === currentPlayer ? 0.9 : 0.8})`,
        outline: props.crab.active ? `2px solid ${
            props.crab.player === 1 ? 
            "hsla(211, 100%, 50%, 50%)" : 
            "hsla(354, 70%, 53%, 50%)"
        }` : `0px solid transparent`,
        outlineOffset: props.crab.active ? "8px" : "0px",
    }

    const hoverStyle = {
        filter: "brightness(125%)"
    }
    
    return(
        <div 
            className={`
                absolute w-1/6 h-1/6 rounded-full shadow-md shadow-zinc-600 transition-all duration-150
                bg-linear-to-r ${props.crab.player === 1 ? "from-crab-blue-left to-crab-blue-right" : "from-crab-red-left to-crab-red-right"}
            `}
            style={isHovered && currentPlayer === props.crab.player ? { ...crabStyle, ...hoverStyle } : crabStyle}
            onClick={() => props.handleCrabActiveFunction(props.crab)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
}