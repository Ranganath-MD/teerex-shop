export type Item = {
  id: string;
  name: string;
  checked: boolean;
};

export type IFilterObject = {
  id: string;
  name: string;
  items: Item[];
};

export const filters_data: IFilterObject[] = [
  {
    id: "colour",
    name: "Colour",
    items: [
      {
        id: "Red",
        name: "Red",
        checked: false,
      },
      {
        id: "Blue",
        name: "Blue",
        checked: false,
      },
      {
        id: "Green",
        name: "Green",
        checked: false,
      },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    items: [
      {
        id: "Men",
        name: "Men",
        checked: false,
      },
      {
        id: "Women",
        name: "Women",
        checked: false,
      },
    ],
  },
  {
    id: "price",
    name: "Price",
    items: [
      {
        id: "0-250",
        name: "0 - Rs. 250",
        checked: false,
      },
      {
        id: "251-450",
        name: "Rs. 251 - Rs. 450",
        checked: false,
      },
      {
        id: "450-",
        name: "> Rs. 450",
        checked: false,
      },
    ],
  },
  {
    id: "type",
    name: "Type",
    items: [
      {
        id: "Polo",
        name: "Polo",
        checked: false,
      },
      {
        id: "Hoodie",
        name: "Hoodie",
        checked: false,
      },
      {
        id: "Basic",
        name: "Basic",
        checked: false,
      },
    ],
  },
];
