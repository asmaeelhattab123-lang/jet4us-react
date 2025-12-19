import { getFlights } from "./apiClient";

// Récupérer tous les aéroports
export const getAllAirports = async () => {
  try {
    const response = await fetch("/api/front-office/client/airports"); // ou apiClient.get si tu préfères axios
    const data = await response.json();
    return data.airports || [];
  } catch (error) {
    console.error("Erreur récupération aéroports :", error);
    return [];
  }
};

// Recherche de vols côté frontend
export const searchFlights = async (from, to) => {
  try {
    const allFlights = await getFlights(); // récupère tous les vols
    return allFlights.filter(
      (f) =>
        f.departureCity.toLowerCase().includes(from.toLowerCase()) &&
        f.arrivalCity.toLowerCase().includes(to.toLowerCase())
    );
  } catch (error) {
    console.error("Erreur recherche vols :", error);
    return [];
  }
};
