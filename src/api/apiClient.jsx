import axios from "axios";
import { BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Auth
export const loginClient = async (phone, password) => {
  const response = await apiClient.post("/api/front-office/client/clients/login", { phone, password });
  return response.data;
};

// Flights
export const getFlights = async (token) => {
  const response = await apiClient.get("/api/front-office/client/flights", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Ajouter ici les autres fonctions : getBookings, createBooking, getAirports, etc.

export default apiClient;
