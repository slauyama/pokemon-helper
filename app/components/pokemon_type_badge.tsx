import { PokemonType } from "../types";

export function PokemonTypeBadge({
  pokemonType,
}: {
  pokemonType: PokemonType;
}) {
  return (
    <p
      style={{ backgroundColor: `var(--${pokemonType.toLowerCase()})` }}
      className="rounded text-[10px] text-white font-semibold w-14 py-0.5 text-center text-shadow-xs text-shadow-slate-950"
    >
      {pokemonType.toUpperCase()}
    </p>
  );
}
