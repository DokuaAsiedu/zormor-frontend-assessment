import { Navbar, Searchbar } from "@/components";
import { lora } from "@/fonts/fonts";
import { useSearchProvider } from "@/providers/search-provider";

export function GeneralLayout({ children }: Children) {
  const { displaySearch, setDisplaySearch } = useSearchProvider();

  return (
    <div className={`${lora.className} relative`}>
      <Navbar
        handleOpen={() => {
          setDisplaySearch(true);
        }}
      />
      {displaySearch && (
        <Searchbar
          handleClose={() => {
            setDisplaySearch(false);
          }}
        />
      )}
      {children}
    </div>
  );
}
