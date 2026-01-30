"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";

type PokemonAudioActions =
  | { type: "ADD_NEW_AUDIO"; audio: string }
  | { type: "REMOVE_AUDIO" };

interface PokemonAudioState {
  audios: string[];
}

function PokemonAudioReducer(
  state: PokemonAudioState,
  action: PokemonAudioActions,
) {
  switch (action.type) {
    case "ADD_NEW_AUDIO":
      return {
        audios: [...state.audios, action.audio],
      };
    case "REMOVE_AUDIO":
      state.audios.shift();

      return {
        audios: [...state.audios],
      };
    default:
      throw new Error("Unexpected action dispatched");
  }
}

const initialState: PokemonAudioState = {
  audios: [],
};

export const PokemonAudioContext = createContext<{
  state: PokemonAudioState;
  dispatch: Dispatch<PokemonAudioActions>;
}>({ state: initialState, dispatch: () => null });

export function PokemonAudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(PokemonAudioReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
    }
  }, [audioRef]);

  return (
    <PokemonAudioContext.Provider value={{ state, dispatch }}>
      <audio
        ref={audioRef}
        className="hidden"
        autoPlay
        src={state.audios[0]}
        onEnded={() => dispatch({ type: "REMOVE_AUDIO" })}
      />
      {children}
    </PokemonAudioContext.Provider>
  );
}
