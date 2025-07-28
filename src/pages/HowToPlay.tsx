import { useState } from "react";
import { ExitDoor } from "../components/ExitDoor";
import { RuleSection } from "../components/RuleSection";
import { rules } from "../constants/constants";
import { RulesButton } from "../components/RulesButton";

export const HowToPlay = () => {
    const [step, setStep] = useState(1);

    const handleStepChange = (direction: "left" | "right") => {
        if (direction === "left") {
            setStep(prev => prev > 1 ? prev - 1 : rules.length);
        } else {
            setStep(prev => prev < rules.length ? prev + 1 : 1);
        }
    }

    return (
        <>
            <ExitDoor />
            
            {rules.map((rule, index) => (
                <RuleSection
                    key={rule.title}
                    title={rule.title}
                    content={rule.content}
                    step={step}
                    sectionIndex={index}
                />
            ))}
            
                
            <div className="fixed bottom-[6vh] left-1/2 -translate-x-1/2 flex gap-4">
                <RulesButton direction="left" handleStepChange={handleStepChange} step={step} />
                <RulesButton direction="right" handleStepChange={handleStepChange} step={step} />
            </div>
        </>
    );
}