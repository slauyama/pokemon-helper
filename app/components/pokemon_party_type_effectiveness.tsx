"use client";

import { useParty } from "../hooks/use_party";
import { DamageCalculation, PokemonType } from "../types";
import { DAMAGE_MATRIX } from "../constants";
import { getDamageCalculation } from "../helpers/helper";
import { PokemonTypeEffectivenessList } from "./pokemon_party_type_effectiveness_list";

type DamageCalculationTypeCountMap = Record<
  Exclude<DamageCalculation, DamageCalculation.NORMAL>,
  Partial<Record<PokemonType, number>>
>;

const { SUPER_EFFECTIVE, NOT_VERY_EFFECTIVE, NO_EFFECT } = DamageCalculation;

export default function PokemonPartyTypeEffectiveness() {
  const { party } = useParty();

  const partyTypes = party.reduce<PokemonType[]>((acc, { types }) => {
    return acc.concat(types.map(({ type }) => type.name));
  }, []);

  const offensiveTypeMap = partyTypes.reduce<DamageCalculationTypeCountMap>(
    (acc, pokemonType) => {
      const pokemonTypes = Object.keys(
        DAMAGE_MATRIX[pokemonType],
      ) as PokemonType[];
      pokemonTypes.forEach((defensivePokemonType: PokemonType) => {
        const damageCalc = getDamageCalculation(
          pokemonType,
          defensivePokemonType,
        );
        if (damageCalc === SUPER_EFFECTIVE) {
          if (!acc[SUPER_EFFECTIVE][defensivePokemonType]) {
            acc[SUPER_EFFECTIVE][defensivePokemonType] = 0;
          }
          acc[SUPER_EFFECTIVE][defensivePokemonType]++;
        } else if (damageCalc === NOT_VERY_EFFECTIVE) {
          if (!acc[NOT_VERY_EFFECTIVE][defensivePokemonType]) {
            acc[NOT_VERY_EFFECTIVE][defensivePokemonType] = 0;
          }
          acc[NOT_VERY_EFFECTIVE][defensivePokemonType]++;
        } else if (damageCalc === NO_EFFECT) {
          if (!acc[NO_EFFECT][defensivePokemonType]) {
            acc[NO_EFFECT][defensivePokemonType] = 0;
          }
          acc[NO_EFFECT][defensivePokemonType]++;
        }
      });

      return acc;
    },
    {
      [SUPER_EFFECTIVE]: {},
      [NOT_VERY_EFFECTIVE]: {},
      [NO_EFFECT]: {},
    },
  );

  const allTypes = Object.values(PokemonType) as PokemonType[];
  const defensiveTypeMap = allTypes.reduce<DamageCalculationTypeCountMap>(
    (acc, offensiveType) => {
      party.forEach((pokemon) => {
        const pokemonDamage = pokemon.types.reduce((acc, { type }) => {
          return acc * getDamageCalculation(offensiveType, type.name);
        }, 1);

        if (pokemonDamage >= DamageCalculation.SUPER_EFFECTIVE) {
          if (!acc[SUPER_EFFECTIVE][offensiveType]) {
            acc[SUPER_EFFECTIVE][offensiveType] = 0;
          }
          acc[SUPER_EFFECTIVE][offensiveType]++;
        } else if (pokemonDamage === 0) {
          if (!acc[NO_EFFECT][offensiveType]) {
            acc[NO_EFFECT][offensiveType] = 0;
          }
          acc[NO_EFFECT][offensiveType]++;
        } else if (pokemonDamage < 1) {
          if (!acc[NOT_VERY_EFFECTIVE][offensiveType]) {
            acc[NOT_VERY_EFFECTIVE][offensiveType] = 0;
          }
          acc[NOT_VERY_EFFECTIVE][offensiveType]++;
        }
      }, acc);

      return acc;
    },
    {
      [SUPER_EFFECTIVE]: {},
      [NOT_VERY_EFFECTIVE]: {},
      [NO_EFFECT]: {},
    },
  );

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">Defense</h2>
        <div className="mt-2 flex justify-between">
          <PokemonTypeEffectivenessList
            damageCalculation={SUPER_EFFECTIVE}
            typeMap={defensiveTypeMap[SUPER_EFFECTIVE]}
            offensive={false}
          />
          <PokemonTypeEffectivenessList
            damageCalculation={NOT_VERY_EFFECTIVE}
            typeMap={defensiveTypeMap[NOT_VERY_EFFECTIVE]}
            offensive={false}
          />
          <PokemonTypeEffectivenessList
            damageCalculation={NO_EFFECT}
            typeMap={defensiveTypeMap[NO_EFFECT]}
            offensive={false}
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Offense</h2>
        <div className="mt-2 flex justify-between">
          <PokemonTypeEffectivenessList
            damageCalculation={SUPER_EFFECTIVE}
            typeMap={offensiveTypeMap[SUPER_EFFECTIVE]}
          />
          <PokemonTypeEffectivenessList
            damageCalculation={NOT_VERY_EFFECTIVE}
            typeMap={offensiveTypeMap[NOT_VERY_EFFECTIVE]}
          />
          <PokemonTypeEffectivenessList
            damageCalculation={NO_EFFECT}
            typeMap={offensiveTypeMap[NO_EFFECT]}
          />
        </div>
      </div>
    </>
  );
}
