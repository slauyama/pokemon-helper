import { SPRITE_FRONT_DEFAULT_BASE_URL } from "../constants";
import Image from "next/image";

export function PokemonSprite({ id }: { id?: number }) {
  return (
    <Image
      height={48}
      width={48}
      alt={`pokemon sprite ${id}`}
      src={id ? `${SPRITE_FRONT_DEFAULT_BASE_URL}${id}.png` : ""}
    />
  );
}
