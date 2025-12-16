import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import LandingSection from "../components/LandingSection";
import FlyNow from "../components/FlyNow";
import ServicesSection from "../components/ServicesSection";
import AppSection from "../components/AppSection.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <LandingSection />
      <FlyNow />
      <ServicesSection />
      <AppSection /> {/* <-- nouvelle section */}
    </>
  );
}

