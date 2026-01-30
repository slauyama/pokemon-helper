"use client";

import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { MAX_POKEMON_PARTY_SIZE } from "../constants";
import { SimplifiedPokemon } from "../types";
import { parseJson } from "../helpers/helper";

type PokemonPartyActions =
  | { type: "ADD_TO_PARTY"; pokemon: SimplifiedPokemon }
  | { type: "REMOVE_FROM_PARTY"; pokemonName: string }
  | { type: "LOAD_PARTY_FROM_LOCAL_STORAGE" };

interface PokemonPartyState {
  party: SimplifiedPokemon[];
}

function savePartyToLocalStorage(party: SimplifiedPokemon[]) {
  try {
    localStorage.setItem("party", JSON.stringify(party));
  } catch (error) {
    console.error(
      "Storage quota exceeded or localStorage not available",
      error,
    );
  }
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
        savePartyToLocalStorage(newParty);
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
      savePartyToLocalStorage(newParty);
      return {
        party: newParty,
      };
    case "LOAD_PARTY_FROM_LOCAL_STORAGE":
      const stringifiedParty = localStorage.getItem("party") as string;
      if (stringifiedParty) {
        const party = parseJson(stringifiedParty) as SimplifiedPokemon[];
        return { party };
      }
      return {
        party: [],
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
