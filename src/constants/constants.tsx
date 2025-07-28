import type { CrabObject } from "../types/types"

export const crabsStart: CrabObject[] = [
    {x: 0, y: 0, player: 1, active: false, id: "11"},
    {x: 3, y: 0, player: 1, active: false, id: "12"},
    {x: 5, y: 2, player: 1, active: false, id: "13"},
    {x: 0, y: 3, player: 1, active: false, id: "14"},
    {x: 2, y: 5, player: 1, active: false, id: "15"},
    {x: 5, y: 5, player: 1, active: false, id: "16"},

    {x: 2, y: 0, player: 2, active: false, id: "21"},
    {x: 5, y: 0, player: 2, active: false, id: "22"},
    {x: 0, y: 2, player: 2, active: false, id: "23"},
    {x: 5, y: 3, player: 2, active: false, id: "24"},
    {x: 0, y: 5, player: 2, active: false, id: "25"},
    {x: 3, y: 5, player: 2, active: false, id: "26"},
];

export const rules = [
        {
            title: "Objective",
            content: <p>The goal of the game is to align four dots of your color in a row either vertically or horizontally.</p>
        },
        {
            title: "Setup",
            content: (
                <>
                    <p>The game board is a 6x6 grid.</p>
                    <p>Each player has pieces represented by colored dots</p>
                </>
            )
        },
        {
            title: "How to Move",
            content: (
                <>
                    <p>On their turn, a player must move one of their dots.</p>
                    <p>Dots can move in straight lines (vertically or horizontally) as far as possible.</p>
                </>
            )
        },
        {
            title: "Movement Limits",
            content: (
                <>
                    <p>Movement stops when the dot reaches:</p>
                    <ul className="list-disc list-inside text-left">
                        <li>The edge of the board</li>
                        <li>Another dot (regardless of the owner).</li>
                    </ul>
                </>
            )
        },
        {
            title: "Winning the Game",
            content: (
                <>
                    <p>The first player to align four dots in a row (vertically or horizontally) wins!</p>
                    <p>Diagonal lines do not count.</p>
                </>
            )
        },
        {
            title: "Game Flow",
            content: (
                <>
                    <p>Players take turns moving one dot at a time.</p>
                    <p>If no player aligns four dots, the game continues until a winner emerges.</p>
                </>
            )
        },
    ];

export const messages = {
    victoryBlue: "🎉🎉 Winner is Blue! 🎉🎉",
    victoryRed: "🎉🎉 Winner is Red! 🎉🎉",
    victoryPlayer: "🎉🎉 You win! 🎉🎉",
    victoryCPU: "You lose...",
    notAllowedMove: "Oops! This move is not allowed.",
    notYourTurn: "Hey! It's not your turn!"
}