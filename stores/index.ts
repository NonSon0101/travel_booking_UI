import AuthStore from "./authStore";
import TourStore from "./tourStore";
import CartStrores from "./cartStores";

export default class RootStore {
  authStore: AuthStore;
  tourStore: TourStore;
  cartStore: CartStrores;

  constructor() {
    this.authStore = new AuthStore(this);
    this.tourStore = new TourStore(this);
    this.cartStore = new CartStrores(this);
  }
}

export const rootStore = new RootStore();
