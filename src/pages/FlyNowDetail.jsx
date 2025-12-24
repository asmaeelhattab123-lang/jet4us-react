import React, { useState, useEffect } from "react";
import { FaCircle, FaArrowLeft } from "react-icons/fa";
import seatIcon from "../assets/seats.svg";
import equaJetLogo from "../assets/equaJetLogo.png";
import hawkerLogo from "../assets/hawkerLogo.png";
import "./FlyNowDetail.css";

export default function FlyNowDetail({ flight, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popup, setPopup] = useState(null);
  const [expiration, setExpiration] = useState(flight.expiration);

  const toggleSeat = (idx) => {
    if (idx < flight.seatsAvailable) {
      setSelectedSeats((prev) =>
        prev.includes(idx)
          ? prev.filter((i) => i !== idx)
          : [...prev, idx]
      );
    }
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

    let depTotalMinutes = depHours * 60 + depMinutes;
    let arrTotalMinutes = arrHours * 60 + arrMinutes;

    if (arrTotalMinutes < depTotalMinutes) {
      arrTotalMinutes += 24 * 60;
    }

    const diffMinutes = arrTotalMinutes - depTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return { hours, minutes };
  };

  const duration = calculateDuration(
    flight.departureTime,
    flight.arrivalTime
  );

  // ===== PRIX DYNAMIQUE (AJOUT UNIQUE) =====
  const seatPrice = parseFloat(flight.price); // ex: "420 USD" → 420
  const totalPrice =
    selectedSeats.length > 0
      ? seatPrice * selectedSeats.length
      : seatPrice;

  // ===== Compte à rebours expiration =====
  useEffect(() => {
    const interval = setInterval(() => {
      let { days, hours, minutes } = expiration;

      if (minutes > 0) {
        minutes -= 1;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours -= 1;
        } else {
          hours = 23;
          if (days > 0) {
            days -= 1;
          }
        }
      }

      setExpiration({ days, hours, minutes });
    }, 60000);

    return () => clearInterval(interval);
  }, [expiration]);

  return (
    <div className="flynow-detail-page">
      <div className="flynow-header-and-details">
        <div className="flynow-back-btn-container">
          <button className="back-arrow-btn" onClick={onBack}>
            <FaArrowLeft />
          </button>
        </div>

        <div className="flynow-title-section">
          <FaCircle className="flynow-red-circle" />
          <h2>Flight Details</h2>
        </div>

        <div className="flynow-detail-container">
          <div className="flight-code">{flight.code}</div>

          <div className="status-row">
            <span className="badge one-way">One way</span>
            <span className="badge confirmed">Confirmed</span>
          </div>

          <div className="info-row">
            <div className="block left">
              <div className="title">Departure</div>
              <div>{flight.date}</div>
              <div>{flight.departureTime}</div>
              <div className="label">From</div>
              <div>{flight.departureCity}</div>
              <div>{flight.departureAirport}</div>
            </div>

            <div className="block right">
              <div className="title">Arrival</div>
              <div>{flight.date}</div>
              <div>{flight.arrivalTime}</div>
              <div className="label">To</div>
              <div>{flight.arrivalCity}</div>
              <div>{flight.arrivalAirport}</div>
            </div>
          </div>

          <div className="fly-now-details-route">
            <span className="fly-now-details-dots">······</span>
            <span className="fly-now-details-jet">✈</span>
            <span className="fly-now-details-dots">······</span>
          </div>

          <div className="flight-operator-aircraft">
            <button
              className="operator-btn"
              onClick={() => setPopup("operator")}
            >
              <img src={equaJetLogo} alt="" className="logo-img" />
              <span className="btn-text">{flight.company}</span>
            </button>

            <button
              className="aircraft-btn"
              onClick={() => setPopup("aircraft")}
            >
              <img src={hawkerLogo} alt="" className="logo-img" />
              <span className="btn-text">{flight.jet}</span>
            </button>
          </div>

          <div className="duration-expiration">
            <div className="duration-text">
              Duration: {duration.hours}h {duration.minutes}m
            </div>

            <div className="expiration-wrapper">
              <span className="expiration-label">Expires in:</span>
              <div className="expiration-text">
                <span data-label="Days">{expiration.days}</span>
                <span data-label="Hours">{expiration.hours}</span>
                <span data-label="Minutes">{expiration.minutes}</span>
              </div>
            </div>
          </div>

          <div className="flynow-detail-seats">
            {[...Array(flight.totalSeats)].map((_, idx) => (
              <div
                key={idx}
                className={`flynow-detail-seat ${
                  idx < flight.seatsAvailable ? "available" : "unavailable"
                } ${selectedSeats.includes(idx) ? "selected" : ""}`}
                onClick={() => toggleSeat(idx)}
              >
                <img src={seatIcon} alt="Seat" />
              </div>
            ))}

            <span className="seat-count">
              {flight.seatsAvailable}/{flight.totalSeats} seats available
            </span>

            <div className="book-container">
              <span className="price">{totalPrice} USD</span>
              <button className="book-btn">Book</button>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setPopup(null)}>
              &times;
            </button>

            {popup === "operator" && (
              <>
                <h3>Operator: {flight.company}</h3>
                <p>Information about the operator...</p>
              </>
            )}

            {popup === "aircraft" && (
              <>
                <h3>Aircraft: {flight.jet}</h3>
                <p>Information about the aircraft...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
