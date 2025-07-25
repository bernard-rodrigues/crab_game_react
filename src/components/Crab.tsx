import type { CrabObject } from "../types/types"

interface CrabProps{
    crab: CrabObject
    handleCrabActiveFunction: (crab: CrabObject) => void
}

export const Crab = (props: CrabProps) => {
    return(
        <div 
            className="absolute w-1/6 bg-red-500 h-1/6 rounded-full"
            style={{
                left: `${(props.crab.x/6)*100}%`,
                top: `${(props.crab.y/6)*100}%`,
                filter: props.crab.active ? 'brightness(80%)' : 'brightness(100%)',
                transform: props.crab.active ? 'scale(0.8)' : 'scale(1)',
                backgroundColor: props.crab.player === 1 ? 'blue' : 'red'
            }}
            onClick={() => props.handleCrabActiveFunction(props.crab)}
        />
    )
}