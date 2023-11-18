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
  // const [isVisibile, setIsVisible] = useState(false);
  const [truckName, setTruckName] = useState("");
  const [type, setType] = useState("");
  const [hours, setHours] = useState("");
  const [lot, setLot] = useState("");
  const [address, setAddress] = useState("");

  // function toggle() {
  //   setIsVisible(!isVisibile);
  // }

  function handleSubmit() {
    console.log("hellloooo!")

    const formData = {
      truckName: truckName,
      type: type,
      hours: hours,
      lot: lot,
      address: address
    }
    
    // Send data to the backend via POST
    fetch('http://localhost:3000/posttest', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // body data type must match "Content-Type" header

    })
    
  }

  return (
      <div>
        {/* <button onClick={toggle}>
          {isVisibile ? 'Hide Form' : 'Show Form'}
        </button> */}
        {/* {isVisibile && ( */}
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
            <input type="submit" />
          </form>
        {/* )} */}
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

// function MyComponent() {

//   var jsonData = {"truckName":"John", "type":"Thai", "hours":"1-5", "lot":"theLot"}

//   var nada = "nada thing";

//   function handleClick() {
    
//     // Send data to the backend via POST
//     fetch('http://localhost:3000/posttest', {  // Enter your IP address here

//       method: 'POST', 
//       mode: 'cors',
//       // body: nada,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

//     })
    
//   }

//   return (
//     <div onClick={handleClick} style={{
//       textAlign: 'center',
//       width: '100px',
//       border: '1px solid gray',
//       borderRadius: '5px'
//     }}>
//       Send data to backend
//     </div>
//   );

// }

// export { MyComponent };

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
      {/* <MyComponent /> */}
    </div>
  );
}

export default App;
