import axios from "axios";

const client = axios.create({
  baseURL: "http://testappmobile.fcmb.com/",
  timeout: 10000,
});

client.interceptors.request.use(
  (config) => {
    // Example: attach auth token from Zustand
    const token = ""; // get from store if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
