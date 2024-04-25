import React from "react";
import { GeneralLayout } from "@/layouts/general-layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePlacesProvider } from "@/providers/db-provider";

export default function AddPlace() {
  const router = useRouter();
  const { places, updatePlaces } = usePlacesProvider();
  const [formData, setFormData] = useState<Place>(null as never);

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
    const formCopy: Place = {...formData}
    formCopy.id = places.length + 1

    placesCopy.push(formCopy);
    updatePlaces(placesCopy);

    localStorage.setItem("places", JSON.stringify(placesCopy));
    router.push("/");
  };

  return (
    <GeneralLayout>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleName}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleDescription}
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocation}
          />
        </div>

        <button
          className="p-2 bg-blue-800 text-white rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </GeneralLayout>
  );
}
