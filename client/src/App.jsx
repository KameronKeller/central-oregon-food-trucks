import React, { useState } from "react";
import './App.css';
import { LotTable } from "./LotTable";
import { TruckForm } from "./TruckForm";

function App() {
  const [truckData, setTruckData] = useState(null);

  React.useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_URL}/trucks`,)
      .then((jsonString) => jsonString.json())
      .then((jsonData) => {
        setTruckData(jsonData);
      })
  }, []);

  return (
    <div className="App">
      <h1>Central Oregon Food Trucks</h1>
      {truckData ? <LotTable trucks={truckData} /> : 'Loading...'}
      <TruckForm />
    </div>
  );
}

export default App;
