"use client";

import { FormEvent, FocusEvent, useRef, useState } from "react";
import { TypeaheadResultsList } from "./typeahead_results_list";
import { TailwindColor } from "./type";

interface TypeaheadProps {
  list: string[];
  maxListSize?: number;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
  onItemClick?: (item: string) => void;
  tailwindColor?: TailwindColor;
}
export function Typeahead({
  list,
  maxListSize,
  onInput,
  onItemClick,
  tailwindColor = "zinc",
}: TypeaheadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  function handleBlur({ relatedTarget }: FocusEvent<HTMLInputElement>) {
    if (!relatedTarget || !containerRef.current?.contains(relatedTarget)) {
      setIsOpen(false);
    }
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    const currentSearchInput = event.currentTarget.value;
    setSearchInput(currentSearchInput);

    if (onInput) {
      onInput(event);
    }

    setIsOpen(Boolean(currentSearchInput));
  }

  return (
    <div>
      <label htmlFor="search" className="text-lg font-semibold">
        Search
      </label>
      <div ref={containerRef} onBlur={handleBlur} className="relative">
        <div
          className={`mt-1 rounded-md bg-white/5 outline-1 -outline-offset-1 outline-[-500 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-${tailwindColor}-500`}
        >
          <input
            name="search"
            type="search"
            id="search"
            className={`rounded-md block w-full grow bg-${tailwindColor}-700 p-2 text-base placeholder:text-${tailwindColor}-500 focus:outline-none sm:text-sm`}
            onInput={handleInput}
            onFocus={() => {
              if (Boolean(searchInput)) {
                setIsOpen(true);
              }
            }}
            placeholder="Search"
            value={searchInput}
            aria-label="search"
            aria-expanded={isOpen}
            aria-controls="typeahead-list"
            aria-autocomplete="list"
          />
        </div>
        <TypeaheadResultsList
          isOpen={isOpen}
          list={list}
          maxListSize={maxListSize}
          onItemClick={onItemClick}
          setIsOpen={setIsOpen}
          tailwindColor={tailwindColor}
        />
      </div>
    </div>
  );
}
