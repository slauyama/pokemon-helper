"use client";

import Party from "./party";
import PokemonSearchInput from "./pokemon_search_input";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <PokemonSearchInput />
      <Party />
    </div>
  );
}
