import React, { useState } from "react";
import CsvLoader from "./components/CsvLoader";
import MapView from "./components/MapView";

type Location = {
  Title: string;
  Note?: string;
  URL: string;
  Comment?: string;
};

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const handleDataLoad = (data: Location[]) => {
    setLocations(data);
  };

  return (
    <div>
      <h1>Map Visualizer</h1>
      <CsvLoader onDataLoad={handleDataLoad} />
      <MapView locations={locations} />
    </div>
  );
};

export default App;
