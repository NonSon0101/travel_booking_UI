import { getAllTours, getTourDetail, searchTour } from "API/tour";
import { ITour, ISuggesttion } from "interfaces/tour";
import { makeAutoObservable } from "mobx";
import RootStore from "stores";

class TourStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  tours: ITour[] = [];
  totalCount: number = 0;

  suggestions: ISuggesttion[] = [];
  totalSreachResult: number = 0;

  tourDetail: ITour = {} as ITour;

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
    this.tourDetail = tour;
  }
}

export default TourStore;
