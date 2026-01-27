"use client";

import { localStorageFetch } from "../../helpers/fetch";
import { capitalize } from "../../helpers/helper";
import { useParty } from "../../hooks/use_party";
import { Pokemon, SimplifiedPokemon } from "../../types";

const SEARCH_RESULT_SIZE = 10;

interface PokemonSearchResultsItemProps {
  pokemonName: string;
  onAdd: () => void;
}
function PokemonSearchResultsItem({
  pokemonName,
  onAdd,
}: PokemonSearchResultsItemProps) {
  const { addToParty } = useParty();

  async function handleClick() {
    const pokemon = await localStorageFetch({
      url: `pokemon/${pokemonName}`,
      filterFunction: (pokemon: Pokemon): SimplifiedPokemon => {
        const { front_default } = { ...pokemon.sprites };
        const {
          abilities,
          base_experience,
          cries,
          forms,
          game_indices,
          height,
          held_items,
          is_default,
          location_area_encounters,
          moves, // potentially would want this
          order,
          past_abilities,
          past_types,
          species,
          stats, // potentially would want this
          weight,
          ...rest
        } = pokemon;
        return { ...rest, sprites: { front_default } };
      },
    });
    addToParty(pokemon);
    onAdd();
  }
  return (
    <li
      className="p-1 hover:bg-zinc-600 rounded-sm cursor-pointer"
      onClick={handleClick}
    >
      {capitalize(pokemonName)}
    </li>
  );
}

interface PokemonSearchResultsProps {
  pokemon: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function PokemonSearchResults({
  pokemon,
  isOpen,
  setIsOpen,
}: PokemonSearchResultsProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul className="absolute z-10 bg-zinc-700 w-56 p-2 rounded-md mt-2">
      {pokemon.map((pokemonName, index) => {
        if (index < SEARCH_RESULT_SIZE) {
          return (
            <PokemonSearchResultsItem
              key={pokemonName}
              pokemonName={pokemonName}
              onAdd={() => setIsOpen(false)}
            />
          );
        }
      })}
    </ul>
  );
}
