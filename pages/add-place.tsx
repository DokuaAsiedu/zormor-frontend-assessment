import { GeneralLayout } from "@/layouts/general-layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { usePlacesProvider } from "@/providers/db-provider";
import { OpenPeriod } from "@/components";

const formStructure = {
  id: 0,
  name: "",
  description: "",
  location: "",
  openPeriods: [
    {days: [], start: "", end: ""}
  ]
}

export default function AddPlace() {
  const router = useRouter();
  const { places, updatePlaces } = usePlacesProvider();
  const [formData, setFormData] = useState<Place>(formStructure);
  const [periods, setPeriods] = useState<Period[]>([{days: [], start: "", end: ""}])

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(formData);

    const placesCopy = [...places];
    const fullForm: Place = Object.assign({}, formData, {openPeriods: periods})
    // console.log(fullForm)
    fullForm.id = places.length + 1

    placesCopy.push(fullForm);
    updatePlaces(placesCopy);

    localStorage.setItem("places", JSON.stringify(placesCopy));
    router.push("/");
  };

  return (
    <GeneralLayout>
      <form className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-stretch">
          <label htmlFor="name">Name: </label>
          <input
            className="p-2 outline-none bg-blue-100 rounded-md"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleName}
            required={true}
          />
        </div>

        <div className="flex flex-col items-stretch">
          <label htmlFor="location">Location: </label>
          <input
            className="p-2 outline-none bg-blue-100 rounded-md"
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocation}
            required={true}
          />
        </div>

        <div className="sm:col-span-2 flex flex-col items-stretch">
          <label htmlFor="description">Description: </label>
          <input
            className="p-2 outline-none bg-blue-100 rounded-md"
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleDescription}
            required={true}
          />
        </div>

        <div className="sm:col-span-2 flex flex-col items-stretch gap-1">
          <p>Open Times:</p>
          <OpenPeriod periods={periods} handlePeriods={setPeriods}/>
        </div>

        <button
          className="sm:col-span-2 p-2 bg-blue-800 text-white rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </GeneralLayout>
  );
}
