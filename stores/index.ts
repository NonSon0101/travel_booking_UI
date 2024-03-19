import AuthStore from "./authStore";
import TourStore from "./tourStore";

export default class RootStore {
  authStore: AuthStore;
  tourStore: TourStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.tourStore = new TourStore(this);
  }
}

export const rootStore = new RootStore();
