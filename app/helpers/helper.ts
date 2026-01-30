import { DAMAGE_MATRIX } from "../constants";
import { DamageCalculation, PokemonType, SimplifiedPokemon } from "../types";

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function prettyPokemonName(pokemonName: string): string {
  return pokemonName
    .split("-")
    .map((str) => capitalize(str))
    .join(" ");
}

export function serializePokemonName(prettyPokemonName: string): string {
  return prettyPokemonName
    .split(" ")
    .map((str) => str.toLowerCase())
    .join("-");
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
