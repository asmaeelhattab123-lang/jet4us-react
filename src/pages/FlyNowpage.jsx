// src/pages/FlyNowpage.jsx
import "./FlyNowpage.css";
import romeImg from "../assets/offers/rome.png";
import parisImg from "../assets/offers/paris.png";
import londonImg from "../assets/offers/londre.png";
import dubaiImg from "../assets/offers/dubai.png";
import lagosImg from "../assets/offers/lagos.png";

const flights = [
  {
    id: 1,
    photo: romeImg,
    date: "01.02.25",
    departureTime: "10:00",
    departureCity: "madrid",
    arrivalTime: "12:30",
    arrivalCity: "dakhla",
    company: "Air Ocean",
    price: "$337.50",
  },
  {
    id: 2,
    photo: parisImg,
    date: "02.02.25",
    departureTime: "14:00",
    departureCity: "Paris",
    arrivalTime: "16:30",
    arrivalCity: "Agadir",
    company: "SkyFly",
    price: "$420.00",
  },
  {
    id: 3,
    photo: londonImg,
    date: "03.02.25",
    departureTime: "09:30",
    departureCity: "Rabat",
    arrivalTime: "11:45",
    arrivalCity: "Tangier",
    company: "JetStream",
    price: "$315.75",
    
  },
  {
    id: 4,
    photo: parisImg,
    date: "05.12.25",
    departureTime: "14:00",
    departureCity: "paris",
    arrivalTime: "16:30",
    arrivalCity: "dubai",
    company: "SkyFly",
    price: "$420.00",
  },
  {
    id: 5,
    photo: dubaiImg,
    date: "13.01.26",
    departureTime: "14:00",
    departureCity: "Dubai",
    arrivalTime: "16:30",
    arrivalCity: "Marrakech",
    company: "SkyFly",
    price: "$420.00",
  },
  {
    id: 6,
    photo: lagosImg,
    date: "13.01.26",
    departureTime: "14:00",
    departureCity: "Lagos",
    arrivalTime: "16:30",
    arrivalCity: "Dakar",
    company: "SkyFly",
    price: "$420.00",
  },
];

export default function FlyNow() {
  return (
    <section className="flynow">
      {/* Titre */}
      <h1 className="flynow-title">Fly Now</h1>

      {/* Description + Recherche */}
      <div className="flynow-top">
        <p className="flynow-desc">
          Are you looking for an immediate departure from a closer airport? Fly Now allows you to book seats on any departing flights in the next 48 hours.
        </p>

        <div className="flynow-search">
          <input type="text" placeholder="From: Airport or City" />
          <input type="text" placeholder="To: Airport or City" />
          <button>Search</button>
        </div>
      </div>

      {/* Liste des vols */}
      <div className="flynow-cards">
        {flights.map((flight) => (
          <div className="flynow-card" key={flight.id}>
            {/* Photo + Date */}
            <div className="flight-photo">
              <img src={flight.photo} alt={flight.arrivalCity} />
              <span className="flight-date">{flight.date}</span>
            </div>

            {/* Infos vol */}
            <div className="flight-info">
              <div className="flight-times">
                <div className="departure">
                  <span className="time">{flight.departureTime}</span>
                  <span className="city">{flight.departureCity}</span>
                </div>
                <div className="route-symbol">• • ✈ • • •</div>
                <div className="arrival">
                  <span className="time">{flight.arrivalTime}</span>
                  <span className="city">{flight.arrivalCity}</span>
                </div>
              </div>

              <hr className="flight-separator" />

              <div className="flight-footer">
                <span className="company">{flight.company}</span>
                <span className="price">{flight.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
