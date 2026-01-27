import { SPRITE_FRONT_DEFAULT_BASE_URL } from "../constants";

export function PokemonSprite({ id }: { id?: number }) {
  return (
    <img
      height="52px"
      width="52px"
      alt={`pokemon sprite ${id}`}
      src={id ? `${SPRITE_FRONT_DEFAULT_BASE_URL}${id}.png` : ""}
    />
  );
}
