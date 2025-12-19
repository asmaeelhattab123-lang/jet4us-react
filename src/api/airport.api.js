import api from "./axios";

export const getAirports = async (search = "", cityId = null) => {
  const res = await api.get("/api/front-office/client/v2/airports", {
    params: {
      query: search,
      city_id: cityId,
    },
  });

  return res.data.data;
};
