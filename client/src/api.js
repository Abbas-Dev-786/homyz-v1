import axios from "axios";

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://127.0.0.1:8000/api/v1"
  : "";

export const getProperties = async (page) => {
  const res = await axios.get(`/properties?page=${page}&sort=-price`);
  return res.data;
};

export const getCities = async () => {
  const res = await axios.get(`/properties/cities`);
  return res.data.data;
};

export const getTop10Properties = async () => {
  const res = await axios.get(`/properties/top10properties`);
  return res.data.data.docs;
};
