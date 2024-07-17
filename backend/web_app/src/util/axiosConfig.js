import axios from "axios";
import { baseURL } from "../api/axiosHelper";
import { store } from "../redux/store";

// config

const axiosInstance = axios.create({ baseURL: baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization header if a token is available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `token ${token}`;
    }
    config.headers["Content-Type"] = "application/json";

    const state = store.getState();

    if(state?.auth?.loginResponse?.selectedRoleId){
      config.params = { ...config.params, selected_role_id:  state?.auth?.loginResponse?.selectedRoleId};
    }

    if(state?.auth?.loginResponse?.selectCompany?.[0]?.company_id){
      config.params = { ...config.params, selected_company_id:  state?.auth?.loginResponse?.selectCompany?.[0]?.company_id};
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;

    return response;
  },
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong"),
);

export default axiosInstance;
