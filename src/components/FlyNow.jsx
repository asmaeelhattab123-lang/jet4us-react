import "./FlyNow.css";
import london from "../assets/offers/londre.png";
import paris from "../assets/offers/paris.png";
import rome from "../assets/offers/rome.png";

const flights = [
  {
    id: 1,
    image: london,
    from: "London",
    to: "Madrid",
    price: "$9,000 per seat",
  },
  {
    id: 2,
    image: paris,
    from: "Paris",
    to: "Dubai",
    price: "$11,500 per seat",
  },
  {
    id: 3,
    image: rome,
    from: "Rome",
    to: "Ibiza",
    price: "$8,200 per seat",
  },
];

export default function FlyNow() {
  return (
    <section className="flynow-section">
      <h2 className="flynow-title">Fly now</h2>

      <div className="flynow-carousel">
        <div className="flynow-track">
          {[...flights, ...flights].map((flight, index) => (
            <div className="flynow-card" key={index}>
              <div
                className="flynow-image"
                style={{ backgroundImage: `url(${flight.image})` }}
              />
              <div className="flynow-info">
                <p className="route">
                  {flight.from} → {flight.to}
                </p>
                <p className="price">{flight.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
