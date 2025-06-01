import { createContext } from "react";

export const AppContext = createContext<{
  chapter: number;
}>({
  chapter: 1
});