import type { CrabObject } from "../types/types"

interface CrabProps{
    crab: CrabObject
    handleCrabActiveFunction: (crab: CrabObject) => void
}

export const Crab = (props: CrabProps) => {
    return(
        <div 
            className={`
                absolute w-1/6 h-1/6 rounded-full shadow-md shadow-zinc-600 transition-all duration-150
                bg-linear-to-r ${props.crab.player === 1 ? "from-crab-blue-left to-crab-blue-right" : "from-crab-red-left to-crab-red-right"}
                hover:brightness-125
            `}
            style={{
                left: `${(props.crab.x/6)*100}%`,
                top: `${(props.crab.y/6)*100}%`,
                transform: props.crab.active ? 'scale(1)' : 'scale(0.9)',
                outline: props.crab.active ? `2px solid ${
                    props.crab.player === 1 ? 
                    "hsla(211, 100%, 50%, 50%)" : 
                    "hsla(354, 70%, 53%, 50%)"
                }` : `0px solid transparent`,
                outlineOffset: props.crab.active ? "8px" : "0px",
            }}
            onClick={() => props.handleCrabActiveFunction(props.crab)}
        />
    );
}