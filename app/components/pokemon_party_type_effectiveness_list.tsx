"use client";

import { DamageCalculation, PokemonType } from "../types";
import { PokemonTypeBadge } from "./pokemon_type_badge";

type TypeCount = [PokemonType, number];

const { SUPER_EFFECTIVE, NOT_VERY_EFFECTIVE, NO_EFFECT } = DamageCalculation;

interface PokemonTypeEffectivenessListItemProps {
  count: number;
  damageCalculation: DamageCalculation;
  offensive: boolean;
  type: PokemonType;
}
export function PokemonTypeEffectivenessListItem({
  count,
  damageCalculation,
  offensive,
  type,
}: PokemonTypeEffectivenessListItemProps) {
  function getFontWeight(): "" | "font-bold" | "font-semibold" {
    if (offensive || count < 2) {
      return "";
    }
    if (count >= 4) {
      return "font-bold";
    }
    return "font-semibold";
  }

  function getFontColor(): string {
    if (
      offensive ||
      count < 3 ||
      (damageCalculation !== SUPER_EFFECTIVE &&
        damageCalculation !== NOT_VERY_EFFECTIVE)
    ) {
      return "";
    }

    const colorMap = {
      [SUPER_EFFECTIVE]: {
        low: "text-red-600 dark:text-red-300" as const,
        high: "text-red-800 dark:text-red-600" as const,
      },
      [NOT_VERY_EFFECTIVE]: {
        low: "text-green-600 dark:text-green-300" as const,
        high: "text-green-800 dark:text-green-600" as const,
      },
    };

    return count >= 5
      ? colorMap[damageCalculation].high
      : colorMap[damageCalculation].low;
  }

  const fontWeight = getFontWeight();
  const fontColor = getFontColor();

  return (
    <li key={type} className="flex gap-1">
      <PokemonTypeBadge pokemonType={type} />
      <p className={`w-5 ${fontColor} ${fontWeight}`}>x{count}</p>
    </li>
  );
}

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
          return (
            <PokemonTypeEffectivenessListItem
              key={type}
              count={count}
              offensive={offensive}
              damageCalculation={damageCalculation}
              type={type}
            />
          );
        })}
      </ul>
    </div>
  );
}
