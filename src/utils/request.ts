import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:6500/api/v1/movies`,
});
