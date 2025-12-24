import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Images
import heroImage from "../assets/jet.png";
import london from "../assets/offers/londre.png";
import paris from "../assets/offers/paris.png";
import rome from "../assets/offers/rome.png";
import madrid from "../assets/offers/madrid.png";
import dubai from "../assets/offers/dubai.png";
import lagos from "../assets/offers/lagos.png";
import servicesImg from "../assets/AIjet.png";
import appImage from "../assets/Jet4usapp1.png";

// CSS
import "./Home.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");

  // ===== Données dynamiques =====
  const heroData = [
    {
      title: "Be elite, be free.",
      subtitle: "The first global E2E (Elite to Elite) co-jetting platform.",
      description: "Discover a world where luxury meets exclusivity.",
      image: heroImage,
    },
  ];

  const flights = [
    { id: 1, image: london, from: "London", to: "Madrid", price: "$9,000 per seat" },
    { id: 2, image: paris, from: "Paris", to: "Dubai", price: "$11,500 per seat" },
    { id: 3, image: rome, from: "Rome", to: "Ibiza", price: "$8,200 per seat" },
    { id: 4, image: madrid, from: "Madrid", to: "Rabat", price: "$8,200 per seat" },
    { id: 5, image: dubai, from: "Dubai", to: "Casablanca", price: "$8,200 per seat" },
    { id: 6, image: lagos, from: "Lagos", to: "Ibiza", price: "$8,200 per seat" },
    { id: 7, image: paris, from: "Paris", to: "Madrid", price: "$8,200 per seat" },
    { id: 8, image: rome, from: "Rabat", to: "Rome", price: "$8,200 per seat" },
  ];

  const services = [
    {
      title: "Our services",
      paragraphs: [
        "Jet4us redefines private aviation with exclusive services designed for the elite.",
        "From seamless jet booking and the curated Jet Set network to the Jetmates co-jetting platform and Jet & Joy loyalty program, every detail is crafted for luxury and personalization.",
        "With VIP concierge services, bespoke experiences, and access to private events, we transform each journey into an extraordinary lifestyle.",
      ],
      highlight: "At jet4us, it’s more than a flight—it’s your gateway to exclusivity and freedom.",
      image: servicesImg,
    },
  ];

  const appSections = [
    {
      title: "Your Gateway to Elite Travel: The Jet4us App",
      description:
        "Experience the ultimate in luxury and convenience with the Jet4us App. Seamlessly book private jet flights, manage your Jet Set network, and access exclusive rewards through the Jet & Joy loyalty program—all at your fingertips.",
      image: appImage,
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Hero Section */}
      {heroData.map((hero, idx) => (
        <section key={idx} className="hero" style={{ backgroundImage: `url(${hero.image})` }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <p className="subtitle">{hero.subtitle}</p>
            <p className="description">{hero.description}</p>
            <div className="hero-search">
              <input type="text" placeholder="search available flights" />
            </div>
          </div>
          <div className="hero-separator" />
        </section>
      ))}

      {/* FlyNow Section */}
      <section className="flynow-section flynow-home">
        <h2 className="flynow-title">Fly now</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={false}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          className="flynow-carousel"
        >
          {flights.map((flight) => (
            <SwiperSlide key={flight.id} className="flynow-slide">
              <div className="flynow-card">
                <div className="flynow-image" style={{ backgroundImage: `url(${flight.image})` }} />
                <div className="flynow-info">
                  <p className="route">{flight.from} → {flight.to}</p>
                  <p className="price">{flight.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="custom-prev"><span>‹</span></div>
          <div className="custom-next"><span>›</span></div>
        </Swiper>
      </section>

      {/* Services Section */}
      {services.map((service, idx) => (
        <section key={idx} className="services-section">
          <div className="section-separator"></div>
          <div className="services-container">
            <div className="services-text">
              <h2>{service.title}</h2>
              {service.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
              <p className="highlight">{service.highlight}</p>
            </div>
            <div className="services-image">
              <img src={service.image} alt={service.title} />
            </div>
          </div>
        </section>
      ))}

      {/* App Section */}
      {appSections.map((app, idx) => (
        <section key={idx} className="app-section">
          <div className="app-image"><img src={app.image} alt={app.title} /></div>
          <div className="app-content">
            <h2>{app.title}</h2>
            <p>{app.description}</p>
            <div className="app-buttons">
              <a href="#" className="google-play"><FaGooglePlay className="icon" /> Get it on Google Play</a>
              <a href="#" className="app-store"><FaApple className="icon" /> Download on App Store</a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
