import { useContext, useEffect, useState } from "react"
import { Crab } from "./Crab"
import { crabsStart, messages } from "../constants/constants";
import type { CrabObject } from "../types/types";
import { TurnContext } from "../contexts/TurnContext";
import { Square } from "./Square";
import {MessageModal} from "./MessageModal";
import { useAIPlayer } from "../ai/cpu";

export const Board = () => {
    const aiPlayer = 2;
    
    const {currentPlayer, togglePlayer, gameState, handleGameStateChange, isAIMode, handleIsAIMode} = useContext(TurnContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    
    const [availableSquares, setAvailableSquares] = useState<{x: number, y: number}[]>([]);
    const [crabs, setCrabs] = useState<CrabObject[]>(crabsStart);

    const { makeAIMove } = useAIPlayer();
    
    const [isAIThinking, setIsAIThinking] = useState(false);
    
    useEffect(() => {
        if (isAIMode && currentPlayer === aiPlayer && gameState === 2 && !isAIThinking) {
            makeAIMove(crabs, aiPlayer, setCrabs, togglePlayer, setIsAIThinking);
        }
    }, [currentPlayer, gameState, isAIMode]);
    
    useEffect(() => {
        checkWinner();
    }, [crabs]);

    // Reset game board for any new game
    useEffect(() => {
        if(gameState === 1 || gameState === 2){
            setCrabs(crabsStart);
            handleModalClose();
            handleIsAIMode(gameState === 2);
        }
    }, [gameState]);

    const handleAvailableSquares = (crabPosition: { x: number; y: number }) => {
        const newAvailableSquares = [];
        const directions = [
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 },  // Right
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }   // Down
        ];

        for (const dir of directions) {
            let currentX = crabPosition.x;
            let currentY = crabPosition.y;

            while (true) {
                const nextX = currentX + dir.dx;
                const nextY = currentY + dir.dy;

                // Check if next position is out of bounds
                if (nextX < 0 || nextX >= 6 || nextY < 0 || nextY >= 6) {
                    // Last valid square before wall
                    if (currentX !== crabPosition.x || currentY !== crabPosition.y) {
                        newAvailableSquares.push({ x: currentX, y: currentY });
                    }
                    break;
                }

                // Check if another crab is at the next position
                const isOccupied = crabs.some(
                    pos => pos.x === nextX && pos.y === nextY
                );

                if (isOccupied) {
                    // Last valid square before crab
                    if (currentX !== crabPosition.x || currentY !== crabPosition.y) {
                        newAvailableSquares.push({ x: currentX, y: currentY });
                    }
                    break;
                }

                // Move to next square
                currentX = nextX;
                currentY = nextY;
            }
        }

        setAvailableSquares(newAvailableSquares);
    };

    const handleCrabSelection = (crab: CrabObject) => {
        // If in game
        if(gameState === 1 || gameState === 2){
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
                handleModalMessage(messages.notYourTurn);
            }
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
                handleModalMessage(messages.notAllowedMove);
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
            // Set as game over
            handleGameStateChange(4);
            handleModalMessage(
                winner === 1 ? 
                (isAIMode ? messages.victoryPlayer : messages.victoryBlue) :
                (isAIMode ? messages.victoryCPU : messages.victoryRed)
            )
        }
    }

    const checkAvailability = (squareId: number) => {
        return availableSquares.some(
            square =>
                square.x === (squareId % 6) &&
                square.y === Math.floor(squareId / 6)
        )
    }

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleModalMessage = (message: string) => {
        setCurrentMessage(message);
        handleModalOpen();
    }
    
    return(
        <div 
            id="board" 
            className="
                w-[95%] md:w-3/4 lg:w-auto lg:h-[80%] aspect-square 
                absolute left-1/2 top-1/2 -translate-x-1/2
                grid grid-cols-6 grid-rows-6
                border-2 border-main-text shadow-2xl
                animate-appear-from-up-to-center duration-500 ease-in-out
            "
        >
            {[...Array(36)].map((_, squareId) => (
                <Square 
                    key={squareId}
                    squareId={squareId}
                    moveCrabFunction={moveCrab}
                    checkAvailabilityFunction={checkAvailability}
                />
            ))}
            
            {/* Crabs distribution on the board */}
            {crabs.map(crab => (
                <Crab 
                    key={crab.id}
                    crab={crab}
                    handleCrabActiveFunction={handleCrabSelection}
                />
            ))}

            <MessageModal 
                isOpen={modalOpen} 
                message={currentMessage} 
                closeModalFunction={handleModalClose}
            />
        </div>   
    );
}