import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:6700/api/v1`,
});
