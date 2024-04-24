import { PLACES_DB } from "@/data/places";
import { useEffect, useState, createContext, useContext } from "react";

export const PlacesContext = createContext([]);

export function PlacesProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("places");

    if (!storage) {
      setData(PLACES_DB);
    } else {
      setData(JSON.parse(storage));
    }
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        places: data,
        updatePlaces: setData,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesProvider() {
  return useContext(PlacesContext);
}
