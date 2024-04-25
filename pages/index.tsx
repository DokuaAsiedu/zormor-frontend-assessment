import { LocationCard, Searchbar } from "@/components";
import { GeneralLayout } from "@/layouts/general-layout";
import { usePlacesProvider } from "@/providers/db-provider";
import { useRouter } from "next/router";

export default function Home() {
  const { places } = usePlacesProvider();
  const router = useRouter()

  return (
    <GeneralLayout>
      <div className="container">
        <Searchbar />
        <div className="flex flex-col items-stretch gap-4">
          {places.map((item, index) => (
            <LocationCard data={item} key={`item-${index}`} handleClick={() => {
              router.push({
                pathname: "/place",
                query: {id: item.id}
              })
            }} />
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
}
