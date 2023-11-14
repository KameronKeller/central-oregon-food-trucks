import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';

const TRUCKS = [
  {
      name: "Rico Taco",
      type: "Mexican",
      hours: "Sunday to Sunday, 10am to 8pm",
      lot: "The Food Lot",
      address: "123 abcd st."
  },
  {
      name: "Thai Plates",
      type: "Thai",
      hours: "Sunday to Sunday, 10am to 8pm",
      lot: "The Food Lot",
      address: "123 abcd st."
  }
];

function TruckForm() {
  const [isVisibile, setIsVisible] = useState(false);

  function toggle() {
    setIsVisible(!isVisibile);
  }

  return (
      <div>
        <button onClick={toggle}>
          {isVisibile ? 'Hide Form' : 'Show Form'}
        </button>
        {isVisibile && (
          <form>
            <label>Truck Name:
              <input type="text" />
            </label><br />
            <label>Type:
              <input type="text" />
            </label><br />
            <label>Hours:
              <input type="text" />
            </label><br />
            <label>Lot:
              <input type="text" />
            </label><br />
            <label>Address:
              <input type="text" />
            </label><br />
            <input type="submit" />
          </form>
        )}
      </div>
  );
}

function TruckRow({ truck }) {
  return (
    <tr>
      <td>{truck.name}</td>
      <td>{truck.type}</td>
      <td>{truck.hours}</td>
      <td>{truck.lot}</td>
      <td>{truck.address}</td>
    </tr>
  );
}

function LotTable({ trucks }) {
  const rows = [];

  trucks.forEach((truck) => {
    rows.push(
      <TruckRow
        truck={truck}
        key={truck.name} />
      )}
  );

    return (
      <table>
        <thead>
          <tr>
            <th>Truck Name</th>
            <th>Type</th>
            <th>Hours</th>
            <th>Lot</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}

function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Add Truck
    </button>
  );
}

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <p>
        {!data ? "Loading..." : data}
      </p>
      <TruckForm />
      <LotTable trucks={TRUCKS} />
    </div>
  );
}

export default App;
