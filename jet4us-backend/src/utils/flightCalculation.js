// 🔹 helpers
const toRad = (deg) => (deg * Math.PI) / 180;

// 🔹 distance réelle (km)
export const haversineDistance = (from, to) => {
  if (!from || !to) return null;

  const R = 6371;
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);

  const lat1 = toRad(from.latitude);
  const lat2 = toRad(to.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
};

// 🔹 durée réelle
export const calculateFlightDuration = (flight) => {
  if (!flight.fromAirport || !flight.toAirport) return null;

  const distance = haversineDistance(
    flight.fromAirport,
    flight.toAirport
  );

  const averageSpeed = 750; // jet privé km/h
  return +(distance / averageSpeed).toFixed(1);
};

// 🔹 prix estimé
export const calculateEstimatedPrice = (duration) => {
  if (!duration) return null;
  return Math.round(duration * 4500);
};
