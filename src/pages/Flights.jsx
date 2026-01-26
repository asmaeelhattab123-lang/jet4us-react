import React, { useEffect, useState, useContext } from "react";
import { getFlights } from "../api/apiClient.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import FlightCard from "../components/FlightCard.jsx";


export default function Flights() {
  const { token } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      if (token) {
        const data = await getFlights(token);
        setFlights(data.flights || []);
      }
    };
    fetchFlights();
  }, [token]);

  return (
    <div>
      <h1>Vols disponibles</h1>
      <div>
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}
