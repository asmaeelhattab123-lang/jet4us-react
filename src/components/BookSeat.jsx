import "./BookSeat.css"

export function BookSeat() {
return (
<section className="page hero">
<div className="hero-overlay">
<h1 className="page-title"><span className="dot" /> Book seat</h1>
<p className="page-desc">
jet4us allows to book one or more seats on confirmed flights, pay and fly.
</p>


<div className="search-bar">
<input placeholder="From – Airport or city" />
<span className="swap">⇄</span>
<input placeholder="To – Airport or city" />
<button className="search-btn">🔍</button>
</div>
</div>


<div className="cards-grid">
{[1,2,3].map((i) => (
<div className="flight-card" key={i}>
<div className="card-image photo" />
<div className="card-route">
<span>19:45 Marrakech</span>
<span className="plane">✈</span>
<span>23:00 London</span>
</div>
<div className="card-footer">
<span className="warning">4 seats left!</span>
<span className="price">50.00 USD</span>
</div>
</div>
))}
</div>
</section>
);
}