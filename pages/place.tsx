import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function Place() {
  const [showModal, setShowModal] = useState(false)
  const [modalSrc, setModalScr] = useState("")
  const router = useRouter();
  const { places } = usePlacesProvider();

  const handleModal = (src: string) => {
    setShowModal(true)
    setModalScr(src)
  }

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
                  <p className="justify-self-end self-center">{`${item.start} - ${item.end}`}</p>
                </div>
              )
            })}</div>
            <p>{placeData.description}</p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
              {placeData.images.map((item, index) => {
                return (
                  <Image key={`item-${index}`} alt="location image" src={`${item}`} width={32} height={32} className="w-full aspect-square" onClick={() => handleModal(`${item}`)}/>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {showModal && createPortal(
        <div className="h-full w-full absolute left-0 top-0 flex flex-col items-center justify-center">
          <div className="h-full w-full bg-gray-500/90 fixed top-0 left-0 z-10" onClick={() => setShowModal(false)}></div>

          <Image src={modalSrc} alt="image modal" width={100} height={100} className="container relative z-20 w-full"/>
        </div>,
        document.body)}
    </GeneralLayout>
  );
}
