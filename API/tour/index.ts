import api, { handleError } from "API";
import { ITourPagination } from "interfaces/tour";
import get from "lodash/get";

const TOUR_URL = "/api/v1/tours";

export async function getAllTours(): Promise<ITourPagination> {
  try {
    const response = await api.get(`${TOUR_URL}/all`);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, "API/tour", "getAllTour");
    const errorMessage: string = get(error, "data.error.message", "");
    throw new Error(errorMessage);
  }
}
