import { useContext } from "react";
import { TurnContext } from "../contexts/TurnContext";
import { levels } from "../constants/constants";

interface TurnTextboxProps {
    currentPlayer: number;
    textBoxOwner: number;
    screenWidth: number;
}

// Functional React component that displays a heading indicating whose turn it is ("Blue's turn" or "Red's turn")
// The position and visibility of the text changes based on screen size, current player, and textbox ownership
export const TurnTextbox = (props: TurnTextboxProps) => {
    const {aiLevel, isAIMode} = useContext(TurnContext);
    return (
        <h2 
            // Tailwind CSS classes for responsive layout, fixed position, and smooth transitions
            className="
                text-main-text text-4xl text-center animate-appear
                w-full fixed top-[12vh] transition-all duration-500
                md:top-[10vh] md:text-6xl
                lg:w-fit lg:translate-x-0 lg:text-[3vw] lg:top-1/2 lg:-translate-y-1/2
            "

            // Inline styles to control horizontal position depending on:
            // - screen width (responsive behavior)
            // - which player owns this textbox
            // - which player's turn it is
            style={
                props.screenWidth < 1024 ? ( // On small and medium screens
                    props.textBoxOwner === 1 ? 
                        { 
                            // If this is Player 1's textbox:
                            // Center it if it's Player 1's turn, or move it off-screen to the left
                            left: props.currentPlayer === 1 ? "50%" : "-100%",
                            transform: "translateX(-50%)"
                        } : { 
                            // If this is Player 2's textbox:
                            // Center it if it's Player 2's turn, or move it off-screen to the right
                            right: props.currentPlayer === 2 ? "50%" : "-100%",
                            transform: "translateX(50%)"
                        }
                ) : ( // On large screens (desktop and above)
                    props.textBoxOwner === 1 ? 
                        {
                            // Player 1's textbox: visible on the left if it's their turn
                            left: props.currentPlayer === 1 ? "5vw" : "-100%"
                        } : {
                            // Player 2's textbox: visible on the right if it's their turn
                            right: props.currentPlayer === 2 ? "5vw" : "-100%"
                        }
                )
            }
        >
            {props.textBoxOwner === 1 ? "Blue" : "Red"}'s turn {isAIMode && props.textBoxOwner === 2 ? <span className="text-xs">({levels[aiLevel - 1]})</span> : ""}
        </h2>
    )
}
