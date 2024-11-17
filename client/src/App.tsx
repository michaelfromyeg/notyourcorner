import React, { useState } from "react";
import MapView from "./components/MapView";

type Location = {
  Title: string;
  Note?: string;
  URL: string;
  Comment?: string;
  Coordinates: [number, number];
};

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      Title: "San Francisco",
      URL: "https://en.wikipedia.org/wiki/San_Francisco",
      Coordinates: [37.7749, -122.4194],
    },
    {
      Title: "Los Angeles",
      URL: "https://en.wikipedia.org/wiki/Los_Angeles",
      Coordinates: [34.0522, -118.2437],
    },
    {
      Title: "San Diego",
      URL: "https://en.wikipedia.org/wiki/San_Diego",
      Coordinates: [32.7157, -117.1611],
    },
    {
      Title: "Las Vegas",
      URL: "https://en.wikipedia.org/wiki/Las_Vegas",
      Coordinates: [36.169, -115.1398],
    },
  ]);

  const handleDataLoad = (data: Location[]) => {
    setLocations(data);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <h1>Map Visualizer</h1> */}
      {/* <CsvLoader onDataLoad={handleDataLoad} /> */}
      <MapView locations={locations} />
    </div>
  );
};

export default App;
