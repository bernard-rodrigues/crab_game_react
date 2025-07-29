import { MenuButton } from "../components/MenuButton";

export const MainMenu = () => {
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-evenly">
            <div className="
                animate-appear-from-up select-none
                shadow-2xl border-2 border-main-text text-center
                bg-linear-to-br from-slate-100 to-slate-50
            ">
                <h1 className="
                    text-2xl md:text-5xl px-7 py-5 text-main-text "
                >
                    🦀CRAB GAME!🦀
                </h1>
                <p className="font-montserrat text-xs md:text-sm lg:text-md">Based on <a className="text-blue-600" href="https://www.happyjuice.games/" target="_blank">Lost In Play's</a> Crab Puzzle minigame</p>
                <p className="font-montserrat mb-3 text-xs md:text-sm">Designed by <a className="text-blue-600"  href="https://bernard-rodrigues.github.io/portifolio/" target="_blank">Bernard Rodrigues</a></p>
            </div>
            <div className="flex flex-col gap-5 animate-appear-from-down">
                <MenuButton title="Local 2P" gameState={1} isModal={false}/>
                <MenuButton title="Versus CPU" gameState={5} isModal={false}/>
                <MenuButton title="How to Play" gameState={3} isModal={false} />    
            </div>
        </div>
    )
}