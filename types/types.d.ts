interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  openPeriods: Period[];
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

type Period = {
  days: string[];
  start: string;
  end: string;
};

type DetailsPerPeriod = {
  days: string[];
  handleDelete: () => void;
  canDelete: boolean;
  handleStart: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  start: string;
  end: string;
};
