import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
      <h2>{flight.name}</h2>
      <p>Départ: {flight.departure}</p>
      <p>Arrivée: {flight.arrival}</p>
      <p>Prix: {flight.price} USD</p>
    </div>
  );
}
