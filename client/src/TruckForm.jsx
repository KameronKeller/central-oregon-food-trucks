import React, { useState } from "react";

function LotOption({ option }) {

  return (
    <option value={option}>{option}</option>
  );
}

function FormField({ label, value, setValue }) {

  return (
    <label>
      {label}
      <InputBox
        type="text"
        value={value}
        setValue={setValue}
      />
    </label>
  );
}

function InputBox({ type, value, setValue }) {

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function LotSelector({ label, setLot, setAddress, setIsAddNew, foodLots }) {

  return (
    <label>{label}
      <select
        onChange={(e) => {
          setLot(e.target.value);
          if (e.target.value === "Add New") {
            setAddress("");
            setIsAddNew(true);
          } else {
            setIsAddNew(false);
          }
        }}
      >
        <option value="select">Select...</option>
        <option value="Add New">+ Add New Lot</option>
        {foodLots}
      </select>
    </label>
  );
}

export function TruckForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isAddNew, setIsAddNew] = useState(null);

  const [existingLots, setExistingLots] = useState([]);

  const [truckName, setTruckName] = useState("");
  const [type, setType] = useState("");
  const [lot, setLot] = useState("");
  const [newLot, setNewLot] = useState("");
  const [address, setAddress] = useState("");

  React.useEffect(() => {
    async function fetchExistingLots() {
      try {
        const response = await fetch(`http://${import.meta.env.VITE_API_URL}/existinglots`);
        const lots = await response.json();
        setExistingLots(lots);
      } catch (error) {
        console.error("Failed to fetch existing lots:", error);
      }
    }
    fetchExistingLots();
  }, []);
  
  const foodLots = [];

  for (let lotName in existingLots) {
    if (existingLots.hasOwnProperty(lotName)) {
      foodLots.push(
        <LotOption
          option={lotName}
          key={lotName} />
      );
    }
  }

  React.useEffect(() => {
    if (!isAddNew && lot !== "select") {
      setAddress(existingLots[lot]);
    }
  }, [isAddNew, lot]);


  React.useEffect(() => {
    if (existingLots.length === 0) {
      setIsAddNew(true);
    } else {
      setIsAddNew(false);
    }
  }, [existingLots]);

  function toggle() {
    setIsVisible(!isVisible);
  }

  function handleSubmit() {

    let selectedLot = "";
    if (isAddNew) {
      selectedLot = newLot;
    } else {
      selectedLot = lot;
    }

    if (!truckName || !type || !selectedLot || !address) {
      setError('All fields are required');
      return;
    }

    const formData = {
      truckName: truckName,
      type: type,
      lot: selectedLot,
      address: address
    };

    // Send data to the backend via POST
    fetch(`http://${import.meta.env.VITE_API_URL}/savetruck`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    setTruckName("");
    setType("");
    setLot("");
    setNewLot("");
    setAddress("");

  }

  return (
    <div>
      <button onClick={toggle}>
        Add Food Truck
      </button>
      {isVisible && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <FormField label="Truck Name:" value={truckName} setValue={setTruckName} />
          <FormField label="Type:" value={type} setValue={setType} />
          <LotSelector label="Lot:" setLot={setLot} setAddress={setAddress} setIsAddNew={setIsAddNew} foodLots={foodLots} />
          {isAddNew === true &&
            <>
              <FormField label="New Lot Name:" value={newLot} setValue={setNewLot} />
              <FormField label="Address:" value={address} setValue={setAddress} />
            </>
          }
          {error && <p>{error}</p>}
          <div className="submit-button-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </div>
  );
}
