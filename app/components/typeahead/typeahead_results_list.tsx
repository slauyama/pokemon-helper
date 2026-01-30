import { MouseEvent, useState } from "react";

interface TypeaheadResultsListItemProps {
  closeResultsList: () => void;
  item: string;
  onItemClick?: (item: string) => void | Promise<void>;
  tabIndex?: number;
}
function TypeaheadResultsListItem({
  closeResultsList,
  item,
  onItemClick,
  tabIndex = 0,
}: TypeaheadResultsListItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  async function handleClick(e: MouseEvent<HTMLLIElement>) {
    // Prevent the default blur behavior
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);

    if (onItemClick) {
      await Promise.resolve(onItemClick(item));
    }

    closeResultsList();
  }
  return (
    <li
      className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-sm cursor-pointer"
      onClick={handleClick}
      tabIndex={tabIndex}
      role="option"
      aria-disabled={isDisabled}
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
  onItemClick?: (item: string) => void | Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
}
export function TypeaheadResultsList({
  isOpen,
  list,
  maxListSize = 10,
  onItemClick,
  setIsOpen,
}: TypeaheadResultsListProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul
      className={`absolute w-full z-10 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-md mt-2 outline-1 outline-zinc-300 dark:outline-zinc-600`}
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
              />
            );
          }
        })
      )}
    </ul>
  );
}
