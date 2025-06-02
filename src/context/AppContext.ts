import { createContext } from "react";

export const AppContext = createContext<{
  chapter: number;
  damageMultiplier: number;
}>({
  chapter: 1,
  damageMultiplier: 1
});