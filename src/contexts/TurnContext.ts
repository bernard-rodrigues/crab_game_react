import { createContext } from "react";

interface TurnContextProps{
  currentPlayer: number
  togglePlayer: () => void
  screenWidth: number
  gameState: number
  handleGameStateChange: (newState: number) => void
}

export const TurnContext = createContext({} as TurnContextProps);