import axios from "axios";

const api = axios.create({
  baseURL: "https://API_BASE_URL_DE_TON_BACKEND", // ex: https://api.jet4us.com
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
