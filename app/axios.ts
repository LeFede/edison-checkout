import axios from "axios";

try {
  process.loadEnvFile();
} catch (err) {}
const { EDISON_API_AUTHORIZATION } = process.env;

const urls = {
  prod: "https://api.somosedison.com",
  qa: "https://qa.api.somosedison.com/",
  local: "http://localhost:3001/",
} as const;

const api_prod = axios.create({
  baseURL: urls["qa"],
  headers: {
    Authorization: EDISON_API_AUTHORIZATION,
  },
});

export default api_prod;

// export default api;
