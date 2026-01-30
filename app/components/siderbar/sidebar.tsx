"use client";

import Party from "./party";
import PokemonTypeahead from "./pokemon_typeahead";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <PokemonTypeahead />
      <Party />
    </div>
  );
}
