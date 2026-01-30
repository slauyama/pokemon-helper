import { SPRITE_FRONT_DEFAULT_BASE_URL } from "../constants";
import Image from "next/image";

export function PokemonSprite({ id, name }: { id: number; name: string }) {
  return (
    <Image
      height={48}
      width={48}
      alt={`pokemon ${name} sprite`}
      src={`${SPRITE_FRONT_DEFAULT_BASE_URL}${id}.png`}
    />
  );
}
