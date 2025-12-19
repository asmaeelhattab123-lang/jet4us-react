import api from "./axios";

export const getCities = async (search = "") => {
  const res = await api.get("/api/front-office/client/cities", {
    params: {
      query: search,
      per_page: 20,
    },
  });

  return res.data.data;
};
