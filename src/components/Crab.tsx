import type { CrabObject } from "../types/types"

interface CrabProps{
    crab: CrabObject
    handleCrabActiveFunction: (crab: CrabObject) => void
}

export const Crab = (props: CrabProps) => {
    return(
        <div 
            className="absolute w-1/6 h-1/6 rounded-full shadow-md shadow-zinc-600"
            style={{
                left: `${(props.crab.x/6)*100}%`,
                top: `${(props.crab.y/6)*100}%`,
                filter: props.crab.active ? 'brightness(80%)' : 'brightness(100%)',
                transform: props.crab.active ? 'scale(1)' : 'scale(0.9)',
                background: props.crab.player === 1 
                    ? 'linear-gradient(to right, hsl(211, 100%, 50%), hsl(211, 100%, 40%))' 
                    : 'linear-gradient(to right, hsl(354, 70%, 53%), hsl(354, 70%, 43%))'
            }}
            onClick={() => props.handleCrabActiveFunction(props.crab)}
        />
    )
}