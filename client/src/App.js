import React, { useState } from "react";
import './App.css';

// const TRUCKS = [
//   {
//       name: "Rico Taco",
//       type: "Mexican",
//       hours: "Sunday to Sunday, 10am to 8pm",
//       lot: "The Food Lot",
//       address: "123 abcd st."
//   },
//   {
//       name: "Thai Plates",
//       type: "Thai",
//       hours: "Sunday to Sunday, 10am to 8pm",
//       lot: "The Food Lot",
//       address: "123 abcd st."
//   }
// ];

function TruckForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const [truckName, setTruckName] = useState("");
  const [type, setType] = useState("");
  const [hours, setHours] = useState("");
  const [lot, setLot] = useState("");
  const [address, setAddress] = useState("");

  function toggle() {
    setIsVisible(!isVisible);
  }

  function handleSubmit() {

    if (!truckName || !type || !hours || !lot || !address) {
      setError('All fields are required');
      return;
    }

    const formData = {
      truckName: truckName,
      type: type,
      hours: hours,
      lot: lot,
      address: address
    }
    
    // Send data to the backend via POST
    fetch('http://192.168.0.11:3000/posttest', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // body data type must match "Content-Type" header

    })
    
    setTruckName("");
    setType("");
    setHours("");
    setLot("");
    setAddress("");

  }

  return (
      <div>
        <button onClick={toggle}>
          Add Food Truck
          {/* {isVisible ? 'Hide Form' : 'Show Form'} */}
        </button>
        {isVisible && (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label>Truck Name:
              <input
              type="text"
              value={truckName}
              onChange={(e) => setTruckName(e.target.value)}
              />
            </label><br />
            <label>Type:
              <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              />
            </label><br />
            <label>Hours:
              <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              />
            </label><br />
            <label>Lot:
              <input
              type="text"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              />
            </label><br />
            <label>Address:
              <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
            </label><br />
            {error && <p>{error}</p>}
            <div className="submit-button-container">
              <input type="submit" value="Submit"/>
            </div>
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

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://192.168.0.11:3000/trucks")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      // .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      <h1>Central Oregon Food Trucks</h1>
      {/* <p>
        {!data ? "Loading..." : data}
      </p> */}
      {data ? <LotTable trucks={data} /> : 'Loading...'}
      <TruckForm />
      {/* <MyComponent /> */}
    </div>
  );
}

export default App;
