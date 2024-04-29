
import { DB_NAME, STORE_NAME, VERSION } from "@/config/constants";
import { PLACES_DB } from "@/data/places";
import React, { useEffect, useState, createContext, useContext } from "react";

export const PlacesContext = createContext<DbContextProps>(null as never);

let db: IDBDatabase;

export function PlacesProvider({ children }: Children) {
  const [data, setData] = useState<Place[]>([]);

  const addData = (arr: Place[]) => {
    const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = function() {
      db = this.result;
      console.log("running onupgradeneeded");
      console.log(this)
      const placesStore = db.createObjectStore(
        STORE_NAME, 
        {keyPath: "id"}
      );

      placesStore.createIndex("id", "id", { unique: true });
      placesStore.createIndex("name", "name", { unique: true });
      placesStore.createIndex("description", "description", { unique: false });
      placesStore.createIndex("location", "location", { unique: false });
      placesStore.createIndex("openPeriods", "openPeriods", {unique: false,});
      placesStore.createIndex("images", "images", {unique: false,});
      console.log(placesStore)
    };

    request.onsuccess = function() {
      db = this.result

      // db.onabort = function(e) {
      //   db.close();
      //   db = null;
      // }
      // if (db.objectStoreNames.length == 0) { 
      //   dbCallBack(true, true);
      // } else {
      //   dbCallBack(true, false);
      // }

      const transaction = db.transaction(STORE_NAME, "readwrite")

      const store = transaction.objectStore(STORE_NAME)
      // console.log(store)

      arr.forEach(item => {
        store.put({id: item.id, name: item.name, location: item.location, description: item.description, openPeriods: item.openPeriods, images: item.images})
      })

      const reqAllData = store.getAll()
      console.log(reqAllData)

      reqAllData.onsuccess = function() {
        // console.log(db)
        // console.log(reqAllData.result)
        console.log('data added successfully to database')
        setData(reqAllData.result)
      }

      reqAllData.onerror = function() {
        console.log(this.error)
        console.log('Sorry something went wrong. Please try again later')
      }

      transaction.oncomplete = function() {
        db.close()
      }
    }

    request.onerror = () => {
      console.log("onerror! doesnt work");
    };
  }

  useEffect(() => {
    addData(PLACES_DB)
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <PlacesContext.Provider
      value={{
        places: data,
        updatePlaces: addData,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesProvider() {
  return useContext(PlacesContext);
}
