import { PokemonPartyProvider } from "./components/pokemon_party_provider";
import { Sidebar } from "./components/siderbar/sidebar";
import PokemonPartyTypeEffectiveness from "./components/pokemon_party_type_effectiveness";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-zinc-900">
      <main className="flex min-h-screen gap-6 w-full max-w-5xl flex-col items-center p-4 bg-zinc-900 sm:items-start">
        <h1 className="text-3xl font-bold">Pokemon Team Builder</h1>
        <div className="flex gap-6 w-full">
          <PokemonPartyProvider>
            <Sidebar />
            <div className="grow">
              <PokemonPartyTypeEffectiveness />
            </div>
          </PokemonPartyProvider>
        </div>
      </main>
    </div>
  );
}
