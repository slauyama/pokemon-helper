import { useCallback, useContext } from "react";
import { PokemonPartyContext } from "../components/pokemon_party_provider";
import { SimplifiedPokemon } from "../types";

export function useParty() {
  const { state, dispatch } = useContext(PokemonPartyContext);

  const addToParty = useCallback(
    (pokemon: SimplifiedPokemon) => {
      dispatch({ type: "ADD_TO_PARTY", pokemon });
    },
    [dispatch],
  );

  const removeFromParty = useCallback(
    (pokemonName: string) => {
      dispatch({ type: "REMOVE_FROM_PARTY", pokemonName });
    },
    [dispatch],
  );

  const loadPartyFromLocalStorage = useCallback(() => {
    dispatch({ type: "LOAD_PARTY_FROM_LOCAL_STORAGE" });
  }, [dispatch]);

  return { ...state, addToParty, removeFromParty, loadPartyFromLocalStorage };
}
