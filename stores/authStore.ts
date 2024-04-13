import { makeAutoObservable } from "mobx";
import { use } from "react";
import { omit } from "lodash";
import { useState } from "react";

import RootStore from "stores";
import { IUser } from "interfaces/user";
import { ILoginRequest } from "interfaces/auth";
import { login } from "API/auth";
import { getUserById } from "API/user";
import { PLATFORM } from "enums/common";
import { getAccessToken } from "utils/common";
export default class AuthStore {
  rootStore: RootStore;
  token: string = "";
  user = {} as IUser;
  isLogin: boolean = !!getAccessToken(PLATFORM.WEBSITE);
  userInfo = {} as IUser;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false, token: false });
    this.rootStore = rootStore;
  }

  async FetchUserInfo(): Promise<void> {
    const userId =
      localStorage.getItem(`${PLATFORM.WEBSITE}UserId`) ??
      sessionStorage.getItem(`${PLATFORM.WEBSITE}UserId`);
    if (userId) {
      const user = await getUserById(userId);
      this.isLogin = true;
      this.user = user;
      this.userInfo = user; // Update observable state
    }
  }

  async getUserbyId(platform: PLATFORM): Promise<void> {
    const userId =
      localStorage.getItem(`${platform}UserId`) ??
      sessionStorage.getItem(`${platform}UserId`);
    if (userId) {
      const user = await getUserById(userId);
      this.isLogin = true;
      this.user = user;
    }
  }

  async login(data: ILoginRequest, platform: PLATFORM): Promise<void> {
    console.log("data: ", data);
    const { accessToken, user } = await login(omit(data, "isRemember"));
    if (accessToken) {
      console.log("accessToken", accessToken);
      if (true) {
        localStorage.setItem(`${platform}UserId`, user?._id);
        localStorage.setItem(`${platform}Token`, accessToken);
      }
      this.getUserbyId(platform);
      this.token = accessToken;
    }
  }

  logout(platform: PLATFORM): void {
    this.isLogin = false;
    this.token = "";
    this.user = {} as IUser;
    localStorage.removeItem(`${platform}Token`);
    localStorage.removeItem(`${platform}UserId`);
    sessionStorage.removeItem(`${platform}Token`);
    sessionStorage.removeItem(`${platform}UserId`);
  }
}
