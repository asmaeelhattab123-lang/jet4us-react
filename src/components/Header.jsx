import React from "react";

export default function Header() {
  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #000000ff" }}>
      <h1>Jet4Us</h1>
      <nav>
        <a href="/">Accueil</a> | <a href="/flights">Vols</a>
      </nav>
    </header>
  );
}
