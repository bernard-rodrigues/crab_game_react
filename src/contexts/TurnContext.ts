import { createContext } from "react";

interface TurnContextProps{
  currentPlayer: number
  togglePlayer: () => void
}

export const TurnContext = createContext({} as TurnContextProps);