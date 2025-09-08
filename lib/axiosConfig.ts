import { apiRoutes } from "@/constants/apiRoutes";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiRoutes.randomUser,
});

export default axiosInstance;
