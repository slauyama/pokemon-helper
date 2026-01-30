import { MouseEvent } from "react";
import { TailwindColor } from "./type";

interface TypeaheadResultsListItemProps {
  closeResultsList: () => void;
  item: string;
  onItemClick?: (item: string) => void;
  tabIndex?: number;
  tailwindColor: TailwindColor;
}
function TypeaheadResultsListItem({
  closeResultsList,
  item,
  onItemClick,
  tabIndex = 0,
  tailwindColor,
}: TypeaheadResultsListItemProps) {
  async function handleClick(e: MouseEvent<HTMLLIElement>) {
    // Prevent the default blur behavior
    e.preventDefault();

    if (onItemClick) {
      onItemClick(item);
    }
    closeResultsList();
  }
  return (
    <li
      className={`p-2 hover:bg-${tailwindColor}-600 rounded-sm cursor-pointer`}
      onClick={handleClick}
      tabIndex={tabIndex}
      role="option"
      aria-selected={false}
    >
      {item}
    </li>
  );
}

interface TypeaheadResultsListProps {
  isOpen: boolean;
  list: string[];
  maxListSize?: number;
  onItemClick?: (item: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  tailwindColor: TailwindColor;
}
export function TypeaheadResultsList({
  isOpen,
  list,
  maxListSize = 10,
  onItemClick,
  setIsOpen,
  tailwindColor,
}: TypeaheadResultsListProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className={`absolute w-full z-10 bg-${tailwindColor}-700 p-2 rounded-md mt-2 outline-1 outline-${tailwindColor}-600`}
      role="listbox"
    >
      {list.length === 0 ? (
        <li className="p-2 rounded-sm">No Results Found</li>
      ) : (
        list.map((item, index) => {
          if (index < maxListSize) {
            return (
              <TypeaheadResultsListItem
                key={item}
                closeResultsList={() => setIsOpen(false)}
                item={item}
                onItemClick={onItemClick}
                tailwindColor={tailwindColor}
              />
            );
          }
        })
      )}
    </ul>
  );
}
