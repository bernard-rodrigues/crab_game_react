import { createContext } from "react";

interface TurnContextProps{
  currentPlayer: number
  randomizePlayer: () => void
  togglePlayer: () => void
  screenWidth: number
  gameState: number
  handleGameStateChange: (newState: number) => void
  isAIMode: boolean
  handleIsAIMode: (state: boolean) => void
  aiLevel: number
  handleAILevel: (level: number) => void
  reset: boolean
  handleReset: (state: boolean) => void
}

export const TurnContext = createContext({} as TurnContextProps);