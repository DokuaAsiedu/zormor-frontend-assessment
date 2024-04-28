import { createContext, useContext, useState } from "react";

export const SearchContext = createContext<SearchContextProps>(null as never);

export function SearchProvider({ children }: Children) {
  const [displaySearch, setDisplaySearch] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        displaySearch: displaySearch,
        setDisplaySearch: setDisplaySearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchProvider() {
  return useContext(SearchContext);
}
