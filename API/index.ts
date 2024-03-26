import axios from "axios";
import { IHeader } from "./constants";
import { PLATFORM } from "enums/common";

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

export function auth(platform: PLATFORM): IHeader {
  if (typeof window === "undefined") {
    return {};
  }
  const token =
    localStorage.getItem(`${platform}Token`) ??
    sessionStorage.getItem(`${platform}Token`) ??
    "";
  return { Authorization: `Bearer ${token}` };
}

export default api;
