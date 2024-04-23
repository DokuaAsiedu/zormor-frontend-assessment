import { Navbar, Searchbar } from "@/components";
import { GeneralLayout } from "@/layouts/general-layout";

export default function Home() {
  return (
    <GeneralLayout>
      <div className="container">
        <Searchbar/>
      </div>
    </GeneralLayout>
  );
}
