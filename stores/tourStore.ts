import { getAllTours, getTourDetail, searchTour } from "API/tour";
import {
  ITour,
  ISuggesttion,
  IPriceOptions,
  IStartLocation,
} from "interfaces/tour";
import { makeAutoObservable } from "mobx";
import RootStore from "stores";

class TourStore {
  rootStore: RootStore;

  tours: ITour[] = [];
  totalCount: number = 0;

  suggestions: ISuggesttion[] = [];
  totalSreachResult: number = 0;

  tourDetail: ITour = {} as ITour;
  priceOptions: IPriceOptions[] = [];
  startLocation: IStartLocation = {} as IStartLocation;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchAllTour(): Promise<void> {
    const { tours, result } = await getAllTours();
    this.tours = tours;
    this.totalCount = result;
  }

  async fetchSreachTour(inputValue: string): Promise<void> {
    const { suggestions, result } = await searchTour(inputValue);
    this.totalSreachResult = result;
    this.suggestions = suggestions;
  }

  async fetchTourDetail(tourid: string): Promise<void> {
    const { tour } = await getTourDetail(tourid);
    this.priceOptions = tour.priceOptions;
    this.startLocation = tour.startLocation;
    this.tourDetail = tour;
  }
}

export default TourStore;
