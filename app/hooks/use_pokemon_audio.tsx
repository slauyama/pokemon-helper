import { useCallback, useContext } from "react";
import { PokemonAudioContext } from "../components/pokemon_audio_provider";

export function usePokemonAudio() {
  const { state, dispatch } = useContext(PokemonAudioContext);

  const addNewAudio = useCallback(
    (audio: string) => {
      dispatch({ type: "ADD_NEW_AUDIO", audio });
    },
    [dispatch],
  );

  return { ...state, addNewAudio };
}
