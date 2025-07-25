import { useContext, useEffect, useState } from "react"
import { Crab } from "./Crab"
import { crabsStart } from "../constants/constants";
import type { CrabObject } from "../types/types";
import { TurnContext } from "../contexts/TurnContext";

export const Board = () => {
    const {currentPlayer, togglePlayer} = useContext(TurnContext);
    
    const [availableSquares, setAvailableSquares] = useState<{x: number, y: number}[]>([]);
    const [crabs, setCrabs] = useState<CrabObject[]>(crabsStart);

    useEffect(() => {
        checkWinner();
    }, [crabs]);

    const handleAvailableSquares = (crabPosition: { x: number; y: number }) => {
        const newAvailableSquares = [];
        const directions = [
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 },  // Right
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }   // Down
        ];

        for (const dir of directions) {
            let currentX = crabPosition.x + dir.dx;
            let currentY = crabPosition.y + dir.dy;

            // Keep moving in the current direction until we hit a wall or another crab
            while (currentX >= 0 && currentX < 6 && currentY >= 0 && currentY < 6) {
                const currentPosition = { x: currentX, y: currentY };
                
                // Check if another crab is at this position
                const isOccupied = crabs.some(
                    pos => pos.x === currentPosition.x && pos.y === currentPosition.y
                );

                if (isOccupied) {
                    break; // Stop if the path is blocked
                } else {
                    newAvailableSquares.push(currentPosition);
                }
                
                currentX += dir.dx;
                currentY += dir.dy;
            }
        }

        // Single state update with all new squares
        setAvailableSquares(newAvailableSquares);
    };

    const handleCrabSelection = (crab: CrabObject) => {
        if(crab.player === currentPlayer){

            // Check if the selected crab is active
            if (crab.active) {
                // Set the current crab as inactive
                setCrabs(crabs.map(currentCrab =>
                    currentCrab.x === crab.x && currentCrab.y === crab.y
                        ? { ...currentCrab, active: false }
                        : currentCrab
                ));
                setAvailableSquares([]);
            } else {
                handleAvailableSquares({ x: crab.x, y: crab.y });
                // Set the current crab as active
                setCrabs(crabs.map(currentCrab =>
                    currentCrab.x === crab.x && currentCrab.y === crab.y
                        ? { ...currentCrab, active: true }
                        : currentCrab.player === currentPlayer
                            ? { ...currentCrab, active: false }
                            : currentCrab
                ));
            }
        }else{
            alert("Hey! It's not your turn!");
        }
    }

    const moveCrab = (squareId: number) => {
        const activeCrab = crabs.find(crab => crab.active === true);
        if(activeCrab){
            const selectedSquare = {x: squareId%6, y: Math.floor(squareId/6)};
            // Verify if the user clicked on an available square
            if(availableSquares.some(square => square.x === selectedSquare.x && square.y === selectedSquare.y)){
                // Moves the crab to the selected square
                setCrabs(crabs.map(crab =>
                    crab.active
                        ? { ...crab, x: selectedSquare.x, y: selectedSquare.y, active: false }
                        : crab
                ));

                setAvailableSquares([]);
                togglePlayer();
            }else{
                alert("Not allowed move!");
            }
        }
    }

    const checkWinner = (): void => {
        let winner = 0;
        // Check rows
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x <= 6 - 4; x++) {
                const rowCrabs = crabs.filter(crab => crab.y === y && crab.x >= x && crab.x < x + 4);
                if (rowCrabs.length === 4) {
                    if (rowCrabs.every(crab => crab.player === 1)) {
                        winner = 1;
                    } else if (rowCrabs.every(crab => crab.player === 2)) {
                        winner = 2;
                    }
                }
            }
        }
        // Check columns
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y <= 6 - 4; y++) {
                const colCrabs = crabs.filter(crab => crab.x === x && crab.y >= y && crab.y < y + 4);
                if (colCrabs.length === 4) {
                    if (colCrabs.every(crab => crab.player === 1)) {
                        winner = 1;
                    } else if (colCrabs.every(crab => crab.player === 2)) {
                        winner = 2;
                    }
                }
            }
        }
        if(winner !== 0){
            setTimeout(() => alert(`Winner is Player ${winner}!`), 100);
        }
    }
    
    return(
        <div id="board" className="w-[95%] aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 grid-rows-6 border-4 border-main-text shadow-2xl">
            {[...Array(36)].map((_, squareId) => (
            <div
                id={`square-${squareId}`}
                key={squareId}
                className={`w-full h-full ${
                    ((Math.floor(squareId / 6) + squareId % 6) % 2 === 0 ? "bg-linear-to-br from-board-blackest to-board-black" : "bg-linear-to-br from-board-whitest to-board-white")
                }`}
                onClick={() => moveCrab(squareId)}
            >
                <div 
                    className="w-full h-full rounded-full opacity-35"
                    style={{
                        backgroundColor: availableSquares.some(
                            square =>
                                square.x === (squareId % 6) &&
                                square.y === Math.floor(squareId / 6)
                        )
                            ? "oklch(71.5% 0.143 215.221)"
                            : "transparent"
                    }}
                />
            </div>
            ))}
            
            {crabs.map(crab => (
                <Crab 
                    key={`${crab.x}${crab.y}`}
                    crab={crab}
                    handleCrabActiveFunction={handleCrabSelection}
                />
            ))}
        </div>   
    );
}