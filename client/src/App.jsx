import React, { useState } from "react";
import './App.css';
import { LotTable } from "./LotTable";
import { TruckForm } from "./TruckForm";

function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/trucks",)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  return (
    <div className="App">
      <h1>Central Oregon Food Trucks</h1>
      {data ? <LotTable trucks={data} /> : 'Loading...'}
      <TruckForm />
    </div>
  );
}

export default App;
