import { rules } from "../constants/constants";

interface RulesButtonProps {
    handleStepChange: (direction: "left" | "right") => void;
    direction: "left" | "right";
    step: number;
}

export const RulesButton = (props: RulesButtonProps) => {
    
    const checkRuleEdge = () => {
        return (props.step === 1 && props.direction === "left") || (props.step === rules.length && props.direction === "right");
    }
    
    return(
        <button 
            className="
                transition-all duration-150 
                hover:cursor-pointer hover:bg-linear-to-br hover:from-slate-200 hover:to-slate-100
                text-xl border-2 border-main-text text-main-text p-3 bg-linear-to-br from-slate-100 to-slate-50 shadow-xl 
                animate-appear-from-down-no-opacity
                md:text-3xl
            "
            onClick={() => props.handleStepChange(props.direction)}
            style={{
                opacity: checkRuleEdge() ? 0 : 1,
                pointerEvents: checkRuleEdge() ? "none" : "auto",
            }}
        >
            {props.direction === "left" ? "Previous" : "Next"}
        </button>
    )
}