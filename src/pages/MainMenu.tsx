import { MenuButton } from "../components/MenuButton";

export const MainMenu = () => {
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-evenly">
            <h1 className="
                animate-appear-from-up select-none 
                shadow-2xl border-2 border-main-text 
                text-2xl md:text-5xl px-7 py-5 text-main-text 
                bg-linear-to-br from-slate-100 to-slate-50"
            >
                🦀CRAB GAME!🦀
            </h1>
            <div className="flex flex-col gap-5 animate-appear-from-down">
                <MenuButton title="Game Start" gameState={1}/>
                <MenuButton title="How to Play" gameState={2}/>
                
            </div>
        </div>
    )
}