interface RuleSectionProps {
    title: string;
    content: React.ReactNode;
    step: number;
    sectionIndex: number;
}

export const RuleSection = (props: RuleSectionProps) => {
    const baseLeft = 150;
    const sectionOffset = 100*props.sectionIndex;

    const sectionStyles = {
        left: `${baseLeft + sectionOffset - 100 * props.step}%`
    };

    return(
        <div 
            className="
                fixed top-1/2 -translate-y-1/2 -translate-x-1/2
                transition-all duration-500 w-3/4 md:w-3/5 lg:w-1/2
                flex flex-col items-center justify-center
                text-main-text text-center
                gap-5 p-5 border-2 border-main-text shadow-2xl bg-linear-to-br from-slate-100 to-slate-50
                animate-appear font-montserrat
                md:text-xl
            "
            style={sectionStyles}
        >
            <h2 className="text-3xl md:text-4xl font-ribeye">{props.title}</h2>
            {props.content}
        </div>
    )
}