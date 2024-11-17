import Papa from "papaparse";
import React, { useState } from "react";

type Location = {
  Title: string;
  Note?: string;
  URL: string;
  Comment?: string;
};

interface CsvLoaderProps {
  onDataLoad: (data: Location[]) => void;
}

const CsvLoader: React.FC<CsvLoaderProps> = ({ onDataLoad }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          const data = results.data as Location[];

          console.log("Parsed data", data);
          onDataLoad(data);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default CsvLoader;
