"use client";

import Image from "next/image";
import { SimplifiedPokemon } from "../../types";
import { prettyPokemonName } from "../../helpers/helper";
import { PokemonSprite } from "../pokemon_sprite";
import { PokemonTypeBadge } from "../pokemon_type_badge";
import { useParty } from "../../hooks/use_party";
import { useEffect } from "react";

interface PokemonRowProps {
  pokemon?: SimplifiedPokemon;
  removeFromParty: (pokemonName: string) => void;
}
function PokemonRow({ pokemon, removeFromParty }: PokemonRowProps) {
  function handleClick() {
    if (pokemon?.name) {
      removeFromParty(pokemon?.name);
    }
  }

  if (pokemon === undefined) {
    return (
      <div className="flex border border-zinc-500 bg-zinc-800 rounded-xs border-dotted h-13 items-center justify-center">
        Add a Pokemon
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <div className="flex align-middle gap-2">
        <PokemonSprite id={pokemon.id} />
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
        className="rounded-md cursor-pointer hover:bg-zinc-800 px-2"
        onClick={handleClick}
      >
        <Image src="/trash_can.svg" alt="trash can" width={15} height={15} />
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
