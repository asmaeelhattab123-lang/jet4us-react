import "./BookSeat.css";

export default function BookSeat() {
  return (
    <section className="bookseat">
      <div className="hero">
        <h1><span /> Book seat</h1>
        <p>Book one or more seats and fly.</p>

        <div className="search">
          <input placeholder="From" />
          <input placeholder="To" />
          <button>🔍</button>
        </div>
      </div>
    </section>
  );
}
