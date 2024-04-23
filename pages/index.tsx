import { LocationCard, Searchbar } from "@/components";
import { PLACES } from "@/data/places";
import { GeneralLayout } from "@/layouts/general-layout";

export default function Home() {
  return (
    <GeneralLayout>
      <div className="container">
        <Searchbar/>
        <div className="flex flex-col items-stretch gap-4">
          {PLACES.map((item, index) => <LocationCard data={item} key={`item-${index}`}/>)}
        </div>
      </div>
    </GeneralLayout>
  );
}
