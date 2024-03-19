import { getAllTours } from "API/tour";
import { ITour } from "interfaces/tour";
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

  async fetchAllTour(): Promise<void> {
    const { tours, result } = await getAllTours();
    this.tours = tours;
    this.totalCount = result;
  }
}

export default TourStore;
