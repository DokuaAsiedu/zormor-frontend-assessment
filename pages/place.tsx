import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

export default function Place() {
  const router = useRouter();
  const { places } = usePlacesProvider();

  const placeData = useMemo(() => {
    const { id } = router.query;

    const match = places.find((item) => item.id === Number(id));
    console.log(match)
    return match;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, places]);

  return (
    <GeneralLayout>
      <div className="container">
        {placeData && (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <p className="capitalize font-bold">{placeData.name}</p>
              <p className="md:justify-self-end capitalize font-bold">{placeData.location}</p>
            </div>
            <div>{placeData.openPeriods.map((item, index) => {
              return (
                <div key={`item-${index}`} className="grid grid-cols-2 font-bold">
                  <p className="capitalize">{item.days.join(', ')}</p>
                  <p className="justify-self-end self-center">{`${item.start}:${item.end}`}</p>
                </div>
              )
            })}</div>
            <p>{placeData.description}</p>
          </div>
        )}
      </div>
    </GeneralLayout>
  );
}
