"use client";

import Image from "next/image";
import { SimplifiedPokemon } from "../../types";
import { prettyPokemonName } from "../../helpers/helper";
import { PokemonSprite } from "../pokemon_sprite";
import { PokemonTypeBadge } from "../pokemon_type_badge";
import { useParty } from "../../hooks/use_party";
import { useEffect } from "react";
import { useIsDarkMode } from "@slauyama/hooks";

interface PokemonRowProps {
  pokemon?: SimplifiedPokemon;
  removeFromParty: (pokemonName: string) => void;
}
function PokemonRow({ pokemon, removeFromParty }: PokemonRowProps) {
  const [isDarkMode] = useIsDarkMode();
  function handleClick() {
    if (pokemon?.name) {
      removeFromParty(pokemon?.name);
    }
  }

  if (pokemon === undefined) {
    return (
      <div className="flex border border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded-xs border-dotted h-13 items-center justify-center">
        Add a Pokemon
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <div className="flex align-middle gap-2">
        <PokemonSprite id={pokemon.id} name={pokemon.name} />
        <div className="flex-col">
          <h3 className="text-lg text-nowrap text-ellipsis overflow-hidden">
            {prettyPokemonName(pokemon.name)}
          </h3>
          <div className="flex gap-1">
            {pokemon?.types?.map((type, index) => {
              return (
                <PokemonTypeBadge key={index} pokemonType={type.type.name} />
              );
            })}
          </div>
        </div>
      </div>
      <button
        className="rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2"
        onClick={handleClick}
      >
        <svg
          fill={isDarkMode ? "#FFF" : "#000"}
          width="15px"
          height="15px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>trash can</title>
          <path d="M30 6.749h-5.331l-3.628-5.442c-0.228-0.337-0.609-0.556-1.041-0.557h-8c-0 0-0 0-0 0-0.432 0-0.813 0.219-1.037 0.552l-0.003 0.004-3.628 5.442h-5.332c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h2.858l1.897 20.864c0.060 0.64 0.594 1.137 1.245 1.137 0 0 0 0 0.001 0h16c0 0 0 0 0 0 0.65 0 1.184-0.497 1.243-1.132l0-0.005 1.897-20.864h2.859c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM12.669 3.25h6.661l2.333 3.499h-11.327zM22.859 28.75h-13.718l-1.772-19.5 17.262-0.001zM11 10.75c-0.69 0-1.25 0.56-1.25 1.25v0 14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c0-0.69-0.56-1.25-1.25-1.25v0zM16 10.75c-0.69 0-1.25 0.56-1.25 1.25v0 14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c0-0.69-0.56-1.25-1.25-1.25v0zM21 10.75c-0.69 0-1.25 0.56-1.25 1.25v14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c-0-0.69-0.56-1.25-1.25-1.25h-0z"></path>
        </svg>
      </button>
    </div>
  );
}

export default function Party() {
  const { party, loadPartyFromLocalStorage, removeFromParty } = useParty();
  useEffect(() => {
    loadPartyFromLocalStorage();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Party</h2>
      <ul className="mt-1 flex flex-col gap-2">
        <PokemonRow pokemon={party[0]} removeFromParty={removeFromParty} />
        <PokemonRow pokemon={party[1]} removeFromParty={removeFromParty} />
        <PokemonRow pokemon={party[2]} removeFromParty={removeFromParty} />
        <PokemonRow pokemon={party[3]} removeFromParty={removeFromParty} />
        <PokemonRow pokemon={party[4]} removeFromParty={removeFromParty} />
        <PokemonRow pokemon={party[5]} removeFromParty={removeFromParty} />
      </ul>
    </div>
  );
}
