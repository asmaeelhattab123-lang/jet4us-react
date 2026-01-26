import React from "react";
import seatIcon from "../assets/seats.svg";
import styles from "./MyFlightCard.module.css";

// 🔹 Fonction pour calculer une durée par défaut
const calculateDuration = (flight) => {
  // Si duration existe, on retourne ça
  if (flight.duration) return flight.duration;

  // Exemple simple : estimation selon jet type
  // 9 seats Jet → 2h, 8 seats → 1.5h, etc.  
  if (flight.jet) {
    if (flight.jet.includes("9 seats")) return 2;
    if (flight.jet.includes("8 seats")) return 1.5;
    return 1; // par défaut
  }

  return 1; // fallback 1h
};

// 🔹 Calcul du prix estimé
const calculateEstimatedPrice = (duration) => {
  if (!duration) return "—";
  return `$${(duration * 4500).toLocaleString()} USD`;
};

export default function MyFlightCard({ flight }) {
  // ✅ Image sécurisée
  const imageSrc =
    flight.image && flight.image.startsWith("http")
      ? flight.image
      : "/jet-interior.png";

  // ✅ Seats sécurisés
  const seatsTotal = parseInt(flight.jet) || flight.jetSize || 1;
  const seatsLeft = flight.seatsLeft ?? flight.seats ?? 0;

  // ✅ Time central
  const centralTime =
    flight.fromTime === flight.toTime ? flight.fromTime : null;

  // 🔹 Durée et prix estimé
  const duration = calculateDuration(flight);
  const estimatedPrice = calculateEstimatedPrice(duration);

  return (
    <div className={`${styles.flightCard} ${styles[flight.status]}`}>
      <div className={styles.flightPhoto}>
        <img src={imageSrc} alt="Private Jet" />

        <span className={`${styles.flightTypeOverlay} ${styles[flight.status]}`}>
          {flight.type}
        </span>

        <span className={styles.flightJetOverlay}>
          {flight.jet || "Private Jet"}
        </span>
      </div>

      <div className={styles.flightInfo}>
        <div className={styles.flightTimes}>
          {/* FROM */}
          <div className={styles.departure}>
            {flight.fromTime !== flight.toTime && (
              <span className={styles.time}>{flight.fromTime}</span>
            )}
            <span className={styles.city}>{flight.fromCity}</span>
          </div>

          {/* CENTRAL DATE + TIME + DURATION */}
          <div className={styles.routeSymbolContainer}>
            <span className={styles.flightDateText}>
              {flight.date}
              {centralTime ? ` / ${centralTime}` : ""}
            </span>

            {/* Duration */}
            <span className={styles.duration}>
              {duration}h
            </span>

            <div className={styles.routeSymbol}>
              <span className={styles.dots}>• •</span>
              <span className={styles.jetSymbol}>✈</span>
              <span className={styles.dots}>• • •</span>
            </div>
          </div>

          {/* TO */}
          <div className={styles.arrival}>
            {flight.fromTime !== flight.toTime && (
              <span className={styles.time}>{flight.toTime}</span>
            )}
            <span className={styles.city}>{flight.toCity}</span>
          </div>
        </div>

        <hr className={`${styles.flightSeparator} ${styles[flight.status]}`} />

        {/* Footer : left / center / right */}
        <div className={styles.flightFooter}>
          <span className={styles.company}>
            {flight.company || "Private Jet"}
          </span>

          <span className={styles.seats}>
            <img src={seatIcon} alt="Seat" className={styles.seatIcon} />
            <span className={styles.available}>{seatsLeft}</span>
            <span className={styles.total}>/{seatsTotal}</span>
          </span>

          <span className={styles.price}>
            {estimatedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
