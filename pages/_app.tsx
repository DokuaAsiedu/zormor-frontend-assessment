import { PlacesProvider } from "@/providers/db-provider";
import { SearchProvider } from "@/providers/search-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <PlacesProvider>
        <Component {...pageProps} />
      </PlacesProvider>
    </SearchProvider>
  );
}
