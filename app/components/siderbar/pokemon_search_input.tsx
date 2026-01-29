"use client";

import { FormEvent, useEffect, useState } from "react";
import { localStorageFetch } from "../../helpers/fetch";
import { PokemonApiSearchResultWrapper } from "../../types";
import { PokemonSearchResults } from "./pokemon_search_results";

export default function PokemonSearchInput() {
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchAllPokemon() {
      const allPokemon = await localStorageFetch<string[]>({
        url: "pokemon",
        queryString: "limit=100000",
        projectionFunction: (
          searchPokemonResults: PokemonApiSearchResultWrapper,
        ) => searchPokemonResults.results.map(({ name }) => name),
      });

      setAllPokemon(allPokemon);
    }

    fetchAllPokemon();
  }, []);

  function onInput(event: FormEvent<HTMLInputElement>) {
    const newSearchInput = event.currentTarget.value;
    setSearchInput(newSearchInput);
    const filteredPokemon = allPokemon.filter((pokemonName) =>
      pokemonName.toLowerCase().includes(newSearchInput.toLowerCase()),
    );
    setFilteredPokemon(filteredPokemon);
    setIsOpen(Boolean(newSearchInput) && filteredPokemon.length > 0);
  }

  return (
    <div>
      <label htmlFor="search" className="text-xl font-semibold text-white">
        Search
      </label>
      <div className="mt-1 rounded-md bg-white/5 outline-1 -outline-offset-1 outline-zinc-500 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-slate-500">
        <input
          name="search"
          type="search"
          id="search"
          aria-label="search"
          onInput={onInput}
          onSelect={() => {
            if (Boolean(searchInput) && filteredPokemon.length > 0) {
              setIsOpen(true);
            }
          }}
          value={searchInput}
          className="rounded-md block w-full grow bg-zinc-700 p-2 text-base text-white placeholder:text-zinc-500 focus:outline-none sm:text-sm"
        />
      </div>
      <PokemonSearchResults
        pokemon={filteredPokemon}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
