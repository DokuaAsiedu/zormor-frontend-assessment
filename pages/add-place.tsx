import { GeneralLayout } from "@/layouts/general-layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { usePlacesProvider } from "@/providers/db-provider";
import { Error, OpenPeriod } from "@/components";

const formStructure = {
  id: 0,
  name: "",
  description: "",
  location: "",
  openPeriods: [{ days: [], start: "", end: "" }],
};

export default function AddPlace() {
  const router = useRouter();
  const { places, updatePlaces } = usePlacesProvider();
  const [formData, setFormData] = useState<Place>(formStructure);
  const [periods, setPeriods] = useState<Period[]>([
    { days: [], start: "", end: "" },
  ]);
  const [errors, setErrors] = useState({name: "", location: "", description: "", openPeriods: ""})

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleErrors = () => {
    let anyError = true

    if (!formData.name.trim()) {
      setErrors(prev => ({...prev, name: "Please enter a valid name"}))
      anyError = false
    }
    else {
      setErrors(prev => ({...prev, name: ""}))
    }


    if (places.find(item => item.name.toLowerCase() === formData.name.trim().toLowerCase())) {
      setErrors(prev => ({...prev, name: "Name already exists"}))
      anyError = false
    }
    else {
      setErrors(prev => ({...prev, name: ""}))
    }


    if (!formData.description.trim()) {
      setErrors(prev => ({...prev, description: "Please enter a valid description"}))
      anyError = false
    }
    else {
      setErrors(prev => ({...prev, description: ""}))
    }


    if (!formData.location.trim()) {
      setErrors(prev => ({...prev, location: "Please enter a valid location"}))
      anyError = false
    }
    else {
      setErrors(prev => ({...prev, location: ""}))
    }


    if (periods.some(item => item.days.length === 0)) {
      setErrors(prev => ({...prev, openPeriods: "Please fill in the days"}))
      anyError = false
    }
    else if (periods.some(item => item.start === "")) {
      setErrors(prev => ({...prev, openPeriods: "Please add the start hours"}))
      anyError = false
    }
    else if (periods.some(item => item.end === "")) {
      setErrors(prev => ({...prev, openPeriods: "Please add the end hours"}))
      anyError = false
    }
    else {
      setErrors(prev => ({...prev, openPeriods: ""}))
    }


    return anyError
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(formData);

    if (!handleErrors()) {
      return
    }

    const fullForm: Place = Object.assign({}, formData, {
      openPeriods: periods,
    });
    // console.log(fullForm)
    fullForm.id = places.length + 1;

    updatePlaces([fullForm]);
    router.push("/");
  };

  return (
    <GeneralLayout>
      <form className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-stretch">
          <label htmlFor="name">Name: </label>
          <input
            className="p-2 outline-none outline-yellow-500 outline-[1px] rounded-md"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleName}
            required={true}
          />
          <Error message={errors.name}/>
        </div>

        <div className="flex flex-col items-stretch">
          <label htmlFor="location">Location: </label>
          <input
            className="p-2 outline-none outline-yellow-500 outline-[1px] rounded-md"
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocation}
            required={true}
          />
          <Error message={errors.location}/>
        </div>

        <div className="sm:col-span-2 flex flex-col items-stretch">
          <label htmlFor="description">Description: </label>
          <input
            className="p-2 outline-none outline-yellow-500 outline-[1px] rounded-md"
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleDescription}
            required={true}
          />
          <Error message={errors.description}/>
        </div>

        <div className="sm:col-span-2 flex flex-col items-stretch gap-1">
          <p>Open Times:</p>
          <OpenPeriod
            periods={periods}
            handlePeriods={setPeriods}
          />
          <Error message={errors.openPeriods}/>
        </div>

        <div className="sm:col-span-2 flex flex-col items-stretch gap-1">
          <label htmlFor="image">Images:</label>
          <input id="image" type="file"/>
        </div>

        <button
          className="sm:col-span-2 p-2 bg-yellow-500 rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </GeneralLayout>
  );
}
