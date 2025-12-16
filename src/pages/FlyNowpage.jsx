import "./FlyNowpage.css";

export default function FlyNow() {
  return (
    <section className="flynow">
      <h1 className="title"><span className="dot" /> Fly now</h1>
      <p className="desc">
        Are you looking for an immediate departure from a closer airport?
      </p>

      <div className="cards">
        {[1,2,3].map(i => (
          <div className="card" key={i}>
            <div className="image">415 × 180</div>
            <div className="route">
              Ouarzazate <span>✈</span> Fes
            </div>
            <div className="footer">
              <span>Sarah Airways</span>
              <span className="price">$337.50</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
