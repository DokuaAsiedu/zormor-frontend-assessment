import { LocationCard, Searchbar } from "@/components";
import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";

export default function Home() {
  const { places } = usePlacesProvider();

  return (
    <GeneralLayout>
      <div className="container">
        <Searchbar />
        <div className="flex flex-col items-stretch gap-4">
          {places.map((item, index) => (
            <LocationCard data={item} key={`item-${index}`} />
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
}
