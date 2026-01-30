interface PokemonSprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  back_female?: string;
  back_shiny_female?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other: unknown;
  versions: unknown;
}

export interface PokemonApiSearchResults {
  name: string;
  url: string;
}

export interface PokemonApiSearchResultWrapper {
  count: number;
  next: string;
  previous: string;
  results: PokemonApiSearchResults[];
}

interface PokemonApiTypes {
  slot: 1 | 2;
  type: {
    name: PokemonType;
    url: string;
  };
}

interface PokemonCries {
  latest?: string;
  legacy?: string;
}

export interface Pokemon {
  name: string;
  id: number;
  abilities: unknown[];
  base_experience: number;
  cries: PokemonCries;
  forms: unknown[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  is_default: unknown;
  location_area_encounters: string;
  moves: unknown[];
  order: number;
  past_abilities: unknown[];
  past_types: unknown[];
  species: unknown;
  sprites: PokemonSprites;
  stats: unknown[];
  types: PokemonApiTypes[];
  weight: number;
}

export interface SimplifiedPokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: PokemonApiTypes[];
}

export enum PokemonType {
  Normal = "normal",
  Fighting = "fighting",
  Flying = "flying",
  Poison = "poison",
  Ground = "ground",
  Rock = "rock",
  Bug = "bug",
  Ghost = "ghost",
  Steel = "steel",
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Psychic = "psychic",
  Ice = "ice",
  Dragon = "dragon",
  Dark = "dark",
  Fairy = "fairy",
}

export enum DamageCalculation {
  NO_EFFECT = 0,
  NORMAL = 1,
  SUPER_EFFECTIVE = 2,
  NOT_VERY_EFFECTIVE = 0.5,
}
