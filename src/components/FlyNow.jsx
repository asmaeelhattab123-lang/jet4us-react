import "./FlyNow.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import london from "../assets/offers/londre.png";
import paris from "../assets/offers/paris.png";
import rome from "../assets/offers/rome.png";
import madrid from "../assets/offers/madrid.png";
import dubai from "../assets/offers/dubai.png";
import lagos from "../assets/offers/lagos.png";

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
  {
    id: 4,
    image: madrid,
    from: "Madrid",
    to: "Rabat",
    price: "$8,200 per seat",
  },
  {
    id: 5,
    image: dubai,
    from: "Dubai",
    to: "Casablanca",
    price: "$8,200 per seat",
  },
  {
    id: 6,
    image: lagos,
    from: "Lgos",
    to: "Ibiza",
    price: "$8,200 per seat",
  },
  {
    id: 7,
    image: paris,
    from: "Paris",
    to: "Madrid",
    price: "$8,200 per seat",
  },
  {
    id: 8,
    image: rome,
    from: "Rabat",
    to: "Rome",
    price: "$8,200 per seat",
  },
];

export default function FlyNow() {
  return (
    <section className="flynow-section flynow-home">
      <h2 className="flynow-title">Fly now</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        loop={false}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="flynow-carousel"
      >
        {flights.map((flight) => (
          <SwiperSlide key={flight.id} className="flynow-slide">
            <div className="flynow-card">
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
          </SwiperSlide>
        ))}

        {/* Flèches custom */}
       <div className="custom-prev"><span>‹</span></div>
       <div className="custom-next"><span>›</span></div>

      </Swiper>
    </section>
  );
}
