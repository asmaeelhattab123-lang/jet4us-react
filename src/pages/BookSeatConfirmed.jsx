import { useState } from "react";
import "./BookSeat.css";

export default function BookSeatConfirmed({ flights }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFlightDetail, setShowFlightDetail] = useState(false);

  return (
    <div className="bookseat-container">
      {showFlightDetail && selectedFlight ? (
        <div className="flight-detail">
          <h3>Flight Detail</h3>
          <p>{selectedFlight.fromCity} → {selectedFlight.toCity}</p>
          <p>{selectedFlight.date}</p>
          <button onClick={() => setShowFlightDetail(false)}>Back</button>
        </div>
      ) : (
        <div className="bookseat-list">
          {flights.map(flight => (
            <div
              key={flight.id}
              className={`flight-card ${flight.status}`}
              onClick={() => {
                setSelectedFlight(flight);
                setShowFlightDetail(true);
              }}
            >
              <p>{flight.fromCity} → {flight.toCity}</p>
              <p>{flight.date}</p>
              <p>{flight.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
