import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "Network Error or Something went wrong.";
const token = JSON.parse(localStorage.getItem("user"))?.token;

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://127.0.0.1:8000/api/v1"
  : "";

axios.defaults.headers.common["Authorization"] = token;

export const getProperties = async ({ page, city }) => {
  try {
    const cityQuery = city ? `&city=${city}` : "";

    const res = await axios.get(
      `/properties?page=${page}&sort=-price${cityQuery}`
    );
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getCities = async () => {
  try {
    const res = await axios.get(`/properties/cities`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getTop10Properties = async () => {
  try {
    const res = await axios.get(`/properties/top10properties`);
    return res.data.data.docs;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getProperty = async ({ queryKey }) => {
  try {
    const res = await axios.get(`/properties/${queryKey[1]}`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const registerUser = async (data) => {
  try {
    await axios.post(`/auth/register`, data);
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const LoginUser = async (data) => {
  try {
    const res = await axios.post(`/auth/login`, data);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const verifyEmail = async ({ queryKey }) => {
  try {
    const res = await axios.get(`/auth/verifyEmail/${queryKey[1]}`);
    return res.data.message;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const forgotPassword = async (data) => {
  try {
    await axios.post(`/auth/forgotPassword`, data);
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const resetPassword = async ({ password, confirmPassword, token }) => {
  try {
    await axios.patch(`/auth/resetPassword/${token}`, {
      password,
      confirmPassword,
    });
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};
