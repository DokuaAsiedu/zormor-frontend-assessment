import React from "react";

export function LocationCard({ data, handleClick }: {data: Place, handleClick: () => void}) {
  return (
    <div className="bg-gray-50 rounded-lg p-2" onClick={handleClick}>
      <p>
        <span className="capitalize">{data.name}</span>,{" "}
        <span>{data.location}</span>
      </p>
      <p>{data.description}</p>
    </div>
  );
}
