import { DAMAGE_MATRIX } from "../constants";
import { DamageCalculation, PokemonType, SimplifiedPokemon } from "../types";

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseJson(string: string) {
  try {
    return JSON.parse(string);
  } catch (_error) {
    throw new Error("JSON failed to parse");
  }
}

export function getDamageCalculation(
  offensiveType: PokemonType,
  defensiveType: PokemonType,
): DamageCalculation {
  return DAMAGE_MATRIX[offensiveType][defensiveType] ?? 1;
}
