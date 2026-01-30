"use client";

import { DamageCalculation, PokemonType } from "../types";
import { PokemonTypeBadge } from "./pokemon_type_badge";

type TypeCount = [PokemonType, number];

const { SUPER_EFFECTIVE, NOT_VERY_EFFECTIVE, NO_EFFECT } = DamageCalculation;

interface PokemonTypeEffectivenessListProps {
  damageCalculation: Exclude<DamageCalculation, DamageCalculation.NORMAL>;
  typeMap: Partial<Record<PokemonType, number>>;
  offensive?: boolean;
}
export function PokemonTypeEffectivenessList({
  damageCalculation,
  typeMap,
  offensive = true,
}: PokemonTypeEffectivenessListProps) {
  const offensiveTitleMap: Record<typeof damageCalculation, string> = {
    [SUPER_EFFECTIVE]: "Super Effective",
    [NOT_VERY_EFFECTIVE]: "Not Very Effective",
    [NO_EFFECT]: "No Effect",
  };

  const defensiveTitleMap: Record<typeof damageCalculation, string> = {
    [SUPER_EFFECTIVE]: "Weak To",
    [NOT_VERY_EFFECTIVE]: "Resists",
    [NO_EFFECT]: "Immune To",
  };

  function convertToTypeCount(
    typeMap: Partial<Record<PokemonType, number>>,
  ): TypeCount[] {
    const allTypes = Object.keys(typeMap) as PokemonType[];
    return allTypes
      .map((type: PokemonType): TypeCount => [type, typeMap[type] as number])
      .sort((typeA, typeB) => typeB[1] - typeA[1]);
  }

  return (
    <div className="min-w-42">
      <h4 className="text-lg font-semibold">
        {offensive
          ? offensiveTitleMap[damageCalculation]
          : defensiveTitleMap[damageCalculation]}
      </h4>
      <ul className="flex mt-1 max-w-64 flex-wrap gap-2">
        {convertToTypeCount(typeMap).map(([type, count]) => {
          let fontWeight = "";
          let fontColor = "";
          if (!offensive) {
            if (count > 4) {
              fontWeight = "font-bold";
              if (damageCalculation === SUPER_EFFECTIVE) {
                fontColor = "text-red-600";
              } else if (damageCalculation === NOT_VERY_EFFECTIVE) {
                fontColor = "text-green-600";
              }
            } else if (count > 2) {
              fontWeight = "font-semibold";
              if (damageCalculation === SUPER_EFFECTIVE) {
                fontColor = "text-red-300";
              } else if (damageCalculation === NOT_VERY_EFFECTIVE) {
                fontColor = "text-green-300";
              }
            }
          }

          return (
            <li key={type} className="flex gap-1">
              <PokemonTypeBadge pokemonType={type} />
              <p className={`w-5 ${fontColor} ${fontWeight}`}>x{count}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
