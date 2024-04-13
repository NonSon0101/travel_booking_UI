import api, { auth, handleError } from "API";
import { ILoginRequest, ILoginResponse } from "interfaces/auth";
import { IHeader } from "API/constants";
import get from "lodash/get";
import { PLATFORM } from "enums/common";

const AUTH_URL = "/api/v1/auth";

export async function login(data: ILoginRequest): Promise<ILoginResponse> {
  try {
    const response = await api.post(`${AUTH_URL}/login`, data);
    return response.data.metadata;
  } catch (error) {
    console.log("error", error);
    handleError(error as Error, "API/auth", "login");
    const errorMessage: string =
      get(error, "data.error.message", "") || JSON.stringify(error);
    throw new Error(errorMessage);
  }
}
