import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

export default function Place() {
  const router = useRouter()
  const { places } = usePlacesProvider()

  const placeData = useMemo(() => {
    const { id } = router.query
    
    const match = places.find(item => item.id === Number(id))
    // console.log(match)
    return match
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, places])

  return (
    <GeneralLayout>
      <div className="container">
        {placeData &&
          <>
            <p><span className="capitalize font-bold">{placeData.name}</span>, {placeData.location}</p>
            <p>{placeData.description}</p>
          </>
        }
      </div>
    </GeneralLayout>
  )
}