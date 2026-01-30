"use client";

import { FormEvent, useEffect, useState } from "react";
import { localStorageFetch } from "../../helpers/fetch";
import {
  Pokemon,
  PokemonApiSearchResultWrapper,
  SimplifiedPokemon,
} from "../../types";
import { Typeahead } from "../typeahead/typeahead";
import { prettyPokemonName, serializePokemonName } from "@/app/helpers/helper";
import { useParty } from "@/app/hooks/use_party";

const MAX_LIST_SIZE = 10;

export default function PokemonTypeahead() {
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const { addToParty } = useParty();

  useEffect(() => {
    async function fetchAllPokemon() {
      const allPokemon = await localStorageFetch<string[]>({
        url: "pokemon",
        queryString: "limit=100000",
        projectionFunction: (
          searchPokemonResults: PokemonApiSearchResultWrapper,
        ) =>
          searchPokemonResults.results.map(({ name }) =>
            prettyPokemonName(name),
          ),
      });

      setAllPokemon(allPokemon);
    }

    fetchAllPokemon();
  }, []);

  function handleInput(event: FormEvent<HTMLInputElement>) {
    const startsWithFilter = allPokemon.filter((pokemonName) => {
      return pokemonName
        .toLowerCase()
        .startsWith(event.currentTarget.value.toLowerCase());
    });

    let filteredPokemon: Set<string> = new Set(startsWithFilter);
    if (startsWithFilter.length < MAX_LIST_SIZE) {
      const includesFilter = new Set(
        allPokemon.filter((pokemonName) => {
          return pokemonName
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase());
        }),
      );
      filteredPokemon = filteredPokemon.union(includesFilter);
    }
    setFilteredPokemon([...filteredPokemon]);
  }

  async function handleItemClick(formatedPokemonName: string) {
    const pokemonName = serializePokemonName(formatedPokemonName);
    const pokemon = await localStorageFetch<SimplifiedPokemon>({
      url: `pokemon/${pokemonName}`,
      projectionFunction: (pokemon: Pokemon): SimplifiedPokemon => {
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
  }

  return (
    <Typeahead
      list={filteredPokemon}
      onInput={handleInput}
      onItemClick={handleItemClick}
      maxListSize={MAX_LIST_SIZE}
    />
  );
}
