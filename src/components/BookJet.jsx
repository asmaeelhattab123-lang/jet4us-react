import "./BookJet.css";

export function BookJet() {
return (
<section className="page hero jet">
<div className="hero-overlay">
<h1 className="page-title"><span className="dot" /> Book Jet</h1>
<p className="page-desc">
With jet4us, you can book the most convenient jet with the best offers.
</p>


<div className="form-box">
<div className="form-row">
<input placeholder="From – Airport or city" />
<input placeholder="To – Airport or city" />
</div>
<div className="form-row">
<input placeholder="Departure date & time" />
<input placeholder="Seats" />
</div>
<button className="next-btn">Next</button>
</div>
</div>
</section>
);
}