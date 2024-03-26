export interface ITour {
  _id: string;
  code: string;
  title: string;
  highlights: [];
  thumbnail: string;
  images: [string];
  category: {
    _id: string;
    name: string;
    isActive: true;
    image: string;
    icon: string;
    __v: number;
  };
  startLocation: {
    type: string;
    coordinates: [number, number];
    description: string;
    address: string;
  };
  details: [
    {
      title: string;
      description: string;
      _id: string;
    }
  ];
  inclusions: [string, string, string];
  exclusions: [string, string];
  itinerary: [
    {
      activity: string;
      address: string;
      duration: number;
      location: {
        coordinates: [number, number];
        type: string;
      };
      _id: string;
    }
  ];
  regularPrice: number;
  currency: string;
  discountPercentage: number;
  duration: number;
  numOfRating: number;
  isActive: true;
  locations: [];
  transports: [];
  priceOptions: [
    {
      title: string;
      value: number;
      currency: string;
      _id: string;
    },
    {
      title: string;
      value: number;
      currency: string;
      _id: string;
    }
  ];
  __v: number;
}

export interface ISuggesttion {
  _id: string;
  title: string;
  type: string;
  thumbnail: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
  __v: number;
}

export interface ISreach {
  suggestions: ISuggesttion[];
  result: number;
}

export interface ITourPagination {
  tours: ITour[];
  result: number;
}

export interface ITourDetail {
  tour: ITour;
}
