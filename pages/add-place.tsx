import React from "react";
import { GeneralLayout } from "@/layouts/general-layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePlacesProvider } from "@/providers/db-provider";

const formStructure = {
  name: "",
  description: "",
  location: "",
};

export default function AddPlace() {
  const router = useRouter();
  const { places, updatePlaces } = usePlacesProvider();
  const [formData, setFormData] = useState(formStructure);

  const handleName = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescription = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleLocation = (e) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    const placesCopy = [...places];

    placesCopy.push(formData);
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
