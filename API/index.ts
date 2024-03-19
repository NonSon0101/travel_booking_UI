import axios from "axios";

const API_URL = "http://localhost:4001";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("API", "error", error);
  }
);

export function handleError(
  error: Error,
  filePath: string,
  functionName: string
) {
  const errorPath = `Error: ${filePath} -> ${functionName} -> error: ${Error}`;
  console.error(errorPath, JSON.stringify(error));
}

export default api;
