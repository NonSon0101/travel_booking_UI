import { makeAutoObservable } from "mobx";
import { omit } from "lodash";

import RootStore from "stores";
import { addToCart, deleteCard, getListCart, updateCart } from "API/cart";
import {
  IAddToCart,
  IDeleteCart,
  IListCart,
  IUpdateToCart,
} from "interfaces/cart";

class CartStrores {
  rootStore: RootStore;
  listCart = {} as IListCart;
  cartCount: number = 0;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async fetchCartCount(): Promise<void> {
    const { cart } = await getListCart();
    this.cartCount = cart.tours.length;
  }

  async addToCart(data: IAddToCart): Promise<void> {
    const { cart } = await addToCart(data);
    this.listCart = cart;
  }

  async getListCart(): Promise<void> {
    const { cart } = await getListCart();
    this.listCart = cart;
  }

  async updateCart(data: IUpdateToCart): Promise<void> {
    const { cart } = await updateCart(data);
    this.listCart = cart;
  }

  async deleteCart(data: IDeleteCart): Promise<void> {
    const { cart } = await deleteCard(data);
    this.listCart = cart;
  }
}

export default CartStrores;
