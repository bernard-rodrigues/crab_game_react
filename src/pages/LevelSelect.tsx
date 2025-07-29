import { useContext } from "react"
import { TurnContext } from "../contexts/TurnContext"
import { ExitDoor } from "../components/ExitDoor";

export const LevelSelect = () => {
    const {handleAILevel, handleGameStateChange} = useContext(TurnContext);
    
    const handleLevelSelect = (level: number) => {
        handleAILevel(level);
        handleGameStateChange(2);
    }

    const levels = ["Easy", "Normal", "Hard", "Expert"]
    
    return(
        <>
            <ExitDoor />
            <div className="
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                flex flex-col gap-2
                border border-main-text w-3/4 p-3 bg-linear-to-r from-slate-100 to-slate-50
                animate-appear-from-up
                md:w-2/5
            ">
                <h2 className="mb-3 text-xl text-center">CPU Level</h2>
                {levels.map((level, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleLevelSelect(index + 1)}
                        className="
                            border border-main-text px-3 py-2 bg-linear-to-r from-slate-100 to-slate-50
                            hover:bg-linear-to-r hover:from-slate-200 hover:to-slate-100
                            cursor-pointer
                        "
                    >
                        {level}
                    </button>
                ))}
                <small className="font-montserrat">*Even easy is quite challenging</small>
            </div>
        </>
    )
}