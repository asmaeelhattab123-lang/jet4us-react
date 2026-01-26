import React, { useEffect, useState } from "react";
import axios from "axios";
import MyFlightCard from "../components/MyFlightCard.jsx";
import "./MyFlights.css";

export default function MyFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/flights");
        console.log("FLIGHTS FROM API:", res.data); // 🔥 IMPORTANT
        setFlights(res.data);
      } catch (err) {
        console.error("Fetch flights error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading flights...</p>;
  }

  return (
    <section className="myflights-bg">
      <h1 className="myflights-title">My Flights</h1>

      {flights.length === 0 ? (
        <p>No flights yet.</p>
      ) : (
        <div className="myflights-list">
          {flights.map((flight) => (
            <MyFlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </section>
  );
}
