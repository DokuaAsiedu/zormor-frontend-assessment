import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export default function Place() {
  const router = useRouter()
  const { places } = usePlacesProvider()

  const placeData = useMemo(() => {
    const {id} = router.query
    
    const match = places.find(item => item.id === Number(id))
    // console.log(match)
    return match
  }, [])

  return (
    <GeneralLayout>
      <div className="container">
        {placeData &&
          <>
            <p>{placeData.name}, {placeData.description}</p>
            <p>{placeData.description}</p>
          </>
        }
      </div>
    </GeneralLayout>
  )
}