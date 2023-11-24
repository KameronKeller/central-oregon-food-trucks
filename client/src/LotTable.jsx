export function TruckRow({ truck }) {
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

export function LotTable({ trucks }) {
  const rows = [];

  trucks.forEach((truck) => {
    rows.push(
      <TruckRow
        truck={truck}
        key={truck.name} />
    );
  }
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


