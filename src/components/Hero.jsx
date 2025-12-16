import "./Hero.css";
import heroImage from "../assets/jet.png";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Be elite, be free.</h1>
        <p className="subtitle">
          The first global E2E (Elite to Elite) co-jetting platform.
        </p>
        <p className="description">
          Discover a world where luxury meets exclusivity.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="search available flights"
          />
        </div>
      </div>
      <div className="hero-separator" />
    </section>
  );
}
