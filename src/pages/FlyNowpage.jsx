import "./FlyNowpage.css";

import romeImg from "../assets/offers/rome.png";
import parisImg from "../assets/offers/paris.png";
import londonImg from "../assets/offers/londre.png";
import dubaiImg from "../assets/offers/dubai.png";
import lagosImg from "../assets/offers/lagos.png";

import seatIcon from "../assets/seats.svg";

const flights = [
  {
    id: 1,
    photo: romeImg,
    type: "One way",
    jet: "Hawker 800 XPI",
    date: "01.02.25",
    departureTime: "19:45",
    departureCity: "Lagos",
    arrivalTime: "22:10",
    arrivalCity: "Dakar",
    company: "Equajet",
    seatsAvailable: 3,
    totalSeats: 9,
    price: "2,500 USD",
  },
  {
    id: 2,
    photo: parisImg,
    type: "One way",
    jet: "Gulfstream G550",
    date: "02.02.25",
    departureTime: "14:00",
    departureCity: "Paris",
    arrivalTime: "16:30",
    arrivalCity: "Agadir",
    company: "SkyFly",
    seatsAvailable: 8,
    totalSeats: 13,
    price: "420 USD",
  },
  {
    id: 3,
    photo: londonImg,
    type: "One way",
    jet: "Bombardier Challenger 350",
    date: "03.02.25",
    departureTime: "09:30",
    departureCity: "Rabat",
    arrivalTime: "11:45",
    arrivalCity: "Tangier",
    company: "JetStream",
    seatsAvailable: 0, // COMPLET → ne sera pas affiché
    totalSeats: 9,
    price: "420 USD",
  },
  {
    id: 4,
    photo: parisImg,
    type: "One way",
    jet: "Gulfstream G650",
    date: "05.12.25",
    departureTime: "14:00",
    departureCity: "Paris",
    arrivalTime: "16:30",
    arrivalCity: "Dubai",
    company: "SkyFly",
    seatsAvailable: 10,
    totalSeats: 15,
    price: "420 USD",
  },
  {
    id: 5,
    photo: dubaiImg,
    type: "One way",
    jet: "Hawker 900XP",
    date: "13.01.26",
    departureTime: "14:00",
    departureCity: "Dubai",
    arrivalTime: "16:30",
    arrivalCity: "Marrakech",
    company: "SkyFly",
    seatsAvailable: 5,
    totalSeats: 7,
    price: "420 USD",
  },
  {
    id: 6,
    photo: lagosImg,
    type: "One way",
    jet: "Cessna Citation XLS+",
    date: "13.01.26",
    departureTime: "14:00",
    departureCity: "Lagos",
    arrivalTime: "16:30",
    arrivalCity: "Dakar",
    company: "SkyFly",
    seatsAvailable: 4,
    totalSeats: 5,
    price: "420 USD",
  },
];

export default function FlyNow() {
  return (
    <section className="flynow flynow-menu">
      {/* Titre */}
      <h1 className="flynow-title">Fly Now</h1>

      {/* Description + Recherche */}
      <div className="flynow-top">
        <p className="flynow-desc">
          Are you looking for an immediate departure from a closer airport?
          Fly Now allows you to book seats on any departing flights in the next
          48 hours.
        </p>

        <div className="flynow-search">
          <input type="text" placeholder="From: Airport or City" />
          <input type="text" placeholder="To: Airport or City" />
          <button>Search</button>
        </div>
      </div>

      {/* Cartes des vols */}
      <div className="flynow-cards">
        {flights
          .filter(flight => flight.seatsAvailable > 0) // Ne montre que les vols avec sièges disponibles
          .map((flight) => (
            <div className="flynow-card" key={flight.id}>
              {/* Photo + overlays */}
              <div className="flight-photo">
                <img src={flight.photo} alt={flight.arrivalCity} />

                {/* Type de vol en haut à gauche */}
                <span className="flight-type-overlay">{flight.type}</span>

                {/* Type de jet en bas à droite */}
                <span className="flight-jet-overlay">{flight.jet}</span>
              </div>

              {/* Horaires et villes */}
              <div className="flight-info">
                <div className="flight-times">
                  <div className="departure">
                    <span className="time">{flight.departureTime}</span>
                    <span className="city">{flight.departureCity}</span>
                  </div>

                  {/* Route + Date centrée */}
                  <div className="flynow-route-symbol-container">
                    <span className="flight-date-text">{flight.date}</span>
                    <div className="flynow-route-symbol">
                      <span className="flynow-dots">• •</span>
                      <span className="flynow-jet-symbol">✈</span>
                      <span className="flynow-dots">• • •</span>
                    </div>
                  </div>

                  <div className="arrival">
                    <span className="time">{flight.arrivalTime}</span>
                    <span className="city">{flight.arrivalCity}</span>
                  </div>
                </div>

                {/* Séparateur vert */}
                <hr className="flight-separator" />

                {/* Footer : compagnie, sièges, prix */}
                <div className="flight-footer">
                  <span className="company">{flight.company}</span>

                  <span className="seats">
                    <span className="seat-icon">
                      <img src={seatIcon} alt="Seat" />
                    </span>
                    <span className="seat-count">
                      <span className="available">{flight.seatsAvailable}</span>
                      <span className="available">/</span>
                      {flight.totalSeats}
                    </span>
                  </span>

                  <span className="price">{flight.price}/seat</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
