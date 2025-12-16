import "./ServicesSection.css";
import servicesImg from "../assets/AIjet.png"; // change le nom si besoin

export default function ServicesSection() {
  return (
    <section className="services-section">
      {/* trait rouge */}
      <div className="section-separator"></div>

      <div className="services-container">
        {/* TEXTE À GAUCHE */}
        <div className="services-text">
          <h2>Our services</h2>
          <p>
            Jet4us redefines private aviation with exclusive services designed
            for the elite.
          </p>
          <p>
            From seamless jet booking and the curated Jet Set network to the
            Jetmates co-jetting platform and Jet & Joy loyalty program, every
            detail is crafted for luxury and personalization.
          </p>
          <p>
            With VIP concierge services, bespoke experiences, and access to
            private events, we transform each journey into an extraordinary
            lifestyle.
          </p>
          <p className="highlight">
            At jet4us, it’s more than a flight—it’s your gateway to exclusivity
            and freedom.
          </p>
        </div>

        {/* IMAGE À DROITE */}
        <div className="services-image">
          <img src={servicesImg} alt="Dabajet services" />
        </div>
      </div>
    </section>
  );
}
