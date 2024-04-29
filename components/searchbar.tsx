import { createPortal } from "react-dom";
import React, { useMemo, useState } from "react";
import { usePlacesProvider } from "@/providers/db-provider";
import { useRouter } from "next/router";

export function Searchbar({ handleClose }: { handleClose: () => void }) {
  const { places } = usePlacesProvider();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRedirect = (id: number) => {
    router.push({
      pathname: "/place",
      query: { id: id },
    });
    handleClose();
  };

  const searchRes = useMemo(() => {
    const res = places.filter(
      (item) =>
        item.name.includes(searchTerm.trim()) && searchTerm.trim().length > 0
    );

    return res;
  }, [searchTerm, places]);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full">
      <div
        className="absolute top-0 left-0 z-10 w-full h-full bg-gray-500/90"
        onClick={handleClose}
      />

      <div className="container">
        <div className="relative z-20 mt-24 flex flex-row items-stretch bg-yellow-50 rounded-md *:min-w-0">
          <input
            className="flex-1 p-2 outline-none bg-transparent"
            type="search"
            placeholder="Search for a place..."
            onChange={handleChange}
            value={searchTerm}
          />

          <button className="px-4 bg-yellow-500 rounded-md">
            Search
          </button>

          {searchTerm.length > 0 && (
            <div className="absolute bottom-0 left-0 translate-y-full h-auto max-h-48 w-full flex flex-col items-stretch bg-yellow-50 overflow-y-auto rounded-md *:border-t-[1px] *:border-t-yellow-300">
              {searchRes.length > 0 ? (
                searchRes.map((item, index) => {
                  return (
                    <div
                      key={`item-${index}`}
                      className="px-2 py-4 flex flex-col items-stretch gap-2"
                      onClick={() => handleRedirect(item.id)}
                    >
                      <p className="capitalize font-bold">{item.name}</p>
                      <p className="truncate">{item.description}</p>
                    </div>
                  );
                })
              ) : (
                <div className="px-2 py-4">No results match your query</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
