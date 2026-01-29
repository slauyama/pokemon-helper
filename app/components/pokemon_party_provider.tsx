"use client";

import { createContext, Dispatch, ReactNode, use, useReducer } from "react";
import { useLocalStorage } from "@slauyama/hooks";
import { MAX_POKEMON_PARTY_SIZE } from "../constants";
import { SimplifiedPokemon } from "../types";

type PokemonPartyActions =
  | { type: "ADD_TO_PARTY"; pokemon: SimplifiedPokemon }
  | { type: "REMOVE_FROM_PARTY"; pokemonName: string };

interface PokemonPartyState {
  party: SimplifiedPokemon[];
}

function pokemonPartyReducer(
  state: PokemonPartyState,
  action: PokemonPartyActions,
) {
  switch (action.type) {
    case "ADD_TO_PARTY":
      if (state.party.length < MAX_POKEMON_PARTY_SIZE) {
        const newParty = [...state.party];
        newParty.push(action.pokemon);
        return {
          party: newParty,
        };
      }
      return state;
    case "REMOVE_FROM_PARTY":
      const newParty = [...state.party];
      const index = newParty.findIndex(
        (pokemon) => pokemon.name === action.pokemonName,
      );
      newParty.splice(index, 1);

      return {
        party: newParty,
      };
    default:
      throw new Error("Unexpected action dispatched");
  }
}

const initialState: PokemonPartyState = {
  party: [],
};

export const PokemonPartyContext = createContext<{
  state: PokemonPartyState;
  dispatch: Dispatch<PokemonPartyActions>;
}>({ state: initialState, dispatch: () => null });

export function PokemonPartyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokemonPartyReducer, initialState);
  return (
    <PokemonPartyContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonPartyContext.Provider>
  );
}
