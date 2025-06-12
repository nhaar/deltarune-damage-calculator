import { createContext } from "react";
import { CharacterName } from "../data";

export const AppContext = createContext<{
  chapter: number;
  damageMultiplier: (dmg: number, character: CharacterName) => number;
  rudeBusterMultiplier: (dmg: number) => number;
  rudeStatMultiplier: (dmg: number) => number;
}>({
  chapter: 1,
  damageMultiplier: (n) => n,
  rudeBusterMultiplier: (n) => n,
  rudeStatMultiplier: (n) => n
});