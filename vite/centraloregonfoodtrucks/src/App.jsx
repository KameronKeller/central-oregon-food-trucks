import React, { useState } from "react";
import './App.css';

function LotOption({ option }) {

  return (
    <option value={option}>{option}</option>
  );
}

function TruckForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isAddNew, setIsAddNew] = useState(null);

  const [truckName, setTruckName] = useState("");
  const [type, setType] = useState("");
  const [lot, setLot] = useState("");
  const [newLot, setNewLot] = useState("");
  const [address, setAddress] = useState("");

  function toggle() {
    setIsVisible(!isVisible);
  }

  function handleSubmit() {

    if (!truckName || !type || !lot || !address) {
      setError('All fields are required');
      return;
    }

    let selectedLot = "";
    if (isAddNew) {
      selectedLot = newLot;
    } else {
      selectedLot = lot;
    }

    const formData = {
      truckName: truckName,
      type: type,
      lot: selectedLot,
      address: address
    }
    
    // Send data to the backend via POST
    fetch('http://54.185.54.214/posttest', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // body data type must match "Content-Type" header

    })
    
    setTruckName("");
    setType("");
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
            <label>Lot:
              <select
                onChange={(e) => {
                  setLot(e.target.value);
                  setIsAddNew(true);
                }
                }  
              >
              </select>
            </label><br />
            {isAddNew === true &&
            <label>New Lot Name:
              <input
                type="text"
                value={newLot}
                onChange={(e) => setNewLot(e.target.value)}
              />
            </label>
            }
            <br />
            {isAddNew === true &&
            (<label>Address:
              <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
            </label>)}
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
  let mapsQuery = "https://www.google.com/maps/search/?api=1&query=";
  let encodedAddress = encodeURI(truck.address);
  let addressLink = mapsQuery + encodedAddress;

  return (
    <tr>
      <td>{truck.name}</td>
      <td>{truck.type}</td>
      <td>{truck.lot}</td>
      <td><a href={addressLink}>{truck.address}</a></td>
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
    fetch("http://54.185.54.214/trucks",)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
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
