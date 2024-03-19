import cmsRoutes from "./cms";

const routes = {
  home: {
    value: "/",
  },
  about: {
    value: "/about",
  },
  notfoundpage: {
    value: "/404",
  },
  detail: {
    value: (tourId: number) => `/tour-detail/${tourId}`,
  },
  myProfile: {
    value: "/my-profile",
  },
  cart: {
    value: "/cart",
  },
  wishList: {
    value: "/wish-list",
  },
  ...cmsRoutes,
};

export default routes;
