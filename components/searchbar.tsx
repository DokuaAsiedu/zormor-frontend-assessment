import { createPortal } from "react-dom";
import React from "react";

export function Searchbar({handleClose}: {handleClose: () => void}) {
  return createPortal(
    <div className="container fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-gray-300/55" onClick={handleClose}/>

      <div className="relative z-20 mt-24 flex flex-row items-stretch bg-blue-100 rounded-md *:min-w-0">

        <input
          className="flex-1 p-2 outline-none bg-transparent"
          type="search"
          placeholder="Search for a place..."
        />

        <button className="text-white px-4 bg-blue-800 rounded-md text-xs">Search</button>
      </div>
    </div>,
  document.body);
}
