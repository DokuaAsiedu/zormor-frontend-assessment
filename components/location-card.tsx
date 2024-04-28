import React from "react";

export function LocationCard({
  data,
  handleClick,
}: {
  data: Place;
  handleClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-stretch gap-4 bg-gray-50 rounded-lg p-2"
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <p className="capitalize text-lg font-bold">{data.name}</p>
        <p className="text-sm md:justify-self-end">{data.location}</p>
      </div>
      <p className="break-words">{data.description}</p>
    </div>
  );
}
