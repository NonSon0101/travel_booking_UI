import api, { handleError } from "API";
import { ITourPagination, ISreach, ITourDetail } from "interfaces/tour";
import get from "lodash/get";

const TOUR_URL = "/api/v1";

export async function getAllTours(): Promise<ITourPagination> {
  try {
    const response = await api.get(`${TOUR_URL}/tours/all`);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, "API/tour", "getAllTour");
    const errorMessage: string = get(error, "data.error.message", "");
    throw new Error(errorMessage);
  }
}

export async function searchTour(inputValue: string): Promise<ISreach> {
  try {
    const response = await api.get(`${TOUR_URL}/search/${inputValue}?limit=5`);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, "API/searchTour", "searchTour");
    const errorMessage: string = get(error, "data.error.message", "");
    throw new Error(errorMessage);
  }
}

export async function getTourDetail(tourId: string): Promise<ITourDetail> {
  try {
    const response = await api.get(`${TOUR_URL}/tours/${tourId}`);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, "API/tourDetail", "searchTour");
    const errorMessage: string = get(error, "data.error.message", "");
    throw new Error(errorMessage);
  }
}
