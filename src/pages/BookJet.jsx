import "./BookJet.css";

export default function BookJet() {
  return (
    <section className="bookjet">
      <div className="overlay">
        <h1><span /> Book jet</h1>

        <div className="form">
          <input placeholder="From" />
          <input placeholder="To" />
          <button>Next</button>
        </div>
      </div>
    </section>
  );
}
