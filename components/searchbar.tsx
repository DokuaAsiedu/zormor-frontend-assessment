import { IoIosSearch } from "react-icons/io";

export function Searchbar() {
  return (
    <div className="flex flex-row items-stretch">
      <IoIosSearch/>
      <input className="flex-1" type="search" placeholder="Search for a Place..."/>
      <button className="text-white p-2 bg-blue-800 rounded-md">Search</button>
    </div>
  )
}