interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
}

type Children = {
  children: React.ReactNode;
};

interface DbContextProps {
  places: Place[];
  updatePlaces: (places: Place[]) => void;
}

interface SearchContextProps {
  displaySearch: boolean;
  setDisplaySearch: (displaySearch: boolean) => void;
}
