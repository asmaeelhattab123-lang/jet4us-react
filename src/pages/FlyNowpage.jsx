import "./FlyNowpage.css";

export default function FlyNow() {
  return (
    <section className="flynow">
      {/* Titre principal */}
      <h1 className="flynow-title">Fly Now</h1>

      {/* Section description + recherche */}
      <div className="flynow-top">
        <p className="flynow-desc">
          Are you looking for an immediate departure from a closer airport?
        </p>

        <div className="flynow-search">
          <input type="text" placeholder="From: Airport or City" />
          <input type="text" placeholder="To: Airport or City" />
          <button>Search</button>
        </div>
      </div>

      {/* Liste des offres */}
      <div className="flynow-cards">
        {[1,2,3].map((flight) => (
          <div className="flynow-card" key={flight}>
            {/* Photo */}
            <div className="flight-photo">
              <img src={`../assets/offers/rome.png`} alt="City" />
              <span className="flight-date">01.02.25</span>
            </div>

            {/* Infos vol */}
            <div className="flight-info">
              <div className="flight-times">
                <div className="departure">
                  <span className="time">10:00</span>
                  <span className="city">Ouarzazate</span>
                </div>
                <div className="route-symbol">✈ • • • • • •</div>
                <div className="arrival">
                  <span className="time">12:30</span>
                  <span className="city">Fes</span>
                </div>
              </div>

              <hr className="flight-separator" />

              <div className="flight-footer">
                <span className="company">Air Ocean</span>
                <span className="price">$337.50</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
